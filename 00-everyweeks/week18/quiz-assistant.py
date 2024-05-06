from pathlib import Path
from openai import OpenAI
import uuid
import os

client = OpenAI(api_key='<API KEY HERE>') # FIXME: Replace with your API key

def get_document_list():
    input_dir = "documents"
    pdf_files = [f for f in os.listdir(input_dir) if f.endswith('.pdf')]

    if not pdf_files:
        print("No PDF files found to use.")
        return

    file_paths = []
    for pdf_file in pdf_files:
        pdf_file_path = os.path.join(input_dir, pdf_file)
        print(f"Adding file {pdf_file_path}...")
        file_paths.append(pdf_file_path)

    return file_paths

def print_with_citations(message):
    message_content = message.content[0].text
    annotations = message_content.annotations
    citations = []
    for index, annotation in enumerate(annotations):
        message_content.value = message_content.value.replace(annotation.text, f"[{index}]")
        if file_citation := getattr(annotation, "file_citation", None):
            cited_file = client.files.retrieve(file_citation.file_id)
            citations.append(f"[{index}] {cited_file.filename}")

    print(message_content.value)
    print("\n".join(citations))

def print_thread(thread):
    print("\n\n")
    print(f"Thread {thread.id} Messages")
    messages = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    messages = list(reversed(messages.data))

    for message in messages:
        # Extracting message content and role
        content = message.content[0].text.value if message.content else ""

        role = message.role
        id = message.id

        # Printing message and role
        print("-----------<MESSAGE START>-----------")
        print(f"{role} Message {id}:\n\n")
        print_with_citations(message)
        print("-----------<MESSAGE END>-----------")

def get_vector_store():
    vector_stores = client.beta.vector_stores.list()
    return vector_stores.data[0] if len(vector_stores.data) > 0 else None

def upload_files(vector_store):
    print('Uploading documents to vector store')
    # Ready the files for upload to OpenAI
    file_paths = get_document_list()
    file_streams = [open(path, "rb") for path in file_paths]

    # Use the upload and poll SDK helper to upload the files, add them to the vector store,
    # and poll the status of the file batch for completion.
    file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
        vector_store_id=vector_store.id, files=file_streams
    )
    print(f"Uploaded files to vector store: Status = {file_batch.status}: {file_batch.file_counts}")

def create_vector_store(assistant):
    global uuid
    print(f"Vector Store not found... Creating new Vector Store")

    uuid = str(uuid.uuid4())
    vector_store = client.beta.vector_stores.create(name=f"Study List - {uuid}")

    print(f"Created Vector Store: {vector_store.id} - {vector_store.name}")

    upload_files(vector_store)

    assign_assistant_vector_store(assistant, vector_store)

    return vector_store

def create_or_find_vector_store(assistant):
    print('Determining Vector Store')
    vector_store = get_vector_store()
    if (vector_store is not None):
        print(f"Vector Store found: {vector_store.id} - {vector_store.name}")
        assign_assistant_vector_store(assistant, vector_store)
        return vector_store

    return create_vector_store(assistant)

def create_thread():
    print("Creating Message Thread")
    thread = client.beta.threads.create()
    print(f"Created Message Thread: {thread.id}")

    return thread

def list_assistants():
    return client.beta.assistants.list(
        order="desc",
        limit="20",
    )

def find_my_assistant(assistants):
    # Iterate over the data list and find the item with name "My Assistant"
    my_assistant = None
    for item in assistants:
        if item.name == 'Quiz Creator':
            my_assistant = item
            break

    return my_assistant

def create_or_find_assistant():
    print('Determining Assistant')
    assistants = list_assistants()
    my_assistant = find_my_assistant(assistants)

    if (my_assistant is not None):
        print(f"Assistant found: {my_assistant.id} - {my_assistant.name}")
        return my_assistant

    print(f"Assistant not found... Creating new Assistant")
    my_assistant = client.beta.assistants.create(
        name="Quiz Creator",
        instructions="""You are a multiple choice quiz creator that will use the documents provided and your extensive knowledge base to create a quiz.

Instructions:
1. Always create 20 questions for the quiz
2. Prioritise asking questions that are already present within the reference files.
3. Try asking questions from every file available to you.
4. The questions and answers should be in the same language as the documents provided.
5. Reference the files used.
6. Create questions using all the files as reference.
7. Output a json object containing all the questions and their answers.
""",
        tools=[
            {
                "type": "file_search"
            }
        ],
        model="gpt-3.5-turbo-0125",
        # response_format={"type": "json_object"}
    )

    print(f"Assistant created: {my_assistant.id} - {my_assistant.name}")

    return my_assistant

def assign_assistant_vector_store(assistant, vector_store):
    print("Assigning Vector Store to Assistant")

    return client.beta.assistants.update(
        assistant_id=assistant.id,
        tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
    )
def add_message_to_thread(thread, message):
    print(f"Creating Message '{message}' on Thread - {thread.id}")
    thread_message = client.beta.threads.messages.create(
        thread.id,
        role="user",
        content=message,
    )

    print(f"Message created: {thread_message.id}")

def handle_tools(run, thread):
    # Define the list to store tool outputs
    tool_outputs = []

    # Loop through each tool in the required action section
    for tool in run.required_action.submit_tool_outputs.tool_calls:
        if tool.function.name == "create_quiz":
            print(tool.function.arguments)
            tool_outputs.append({
                "tool_call_id": tool.id,
                "output": "Quiz Completed Successfully!"
            })

    # Submit all tool outputs at once after collecting them in a list
    if tool_outputs:
        try:
            run = client.beta.threads.runs.submit_tool_outputs_and_poll(
                thread_id=thread.id,
                run_id=run.id,
                tool_outputs=tool_outputs
            )
            print("Tool outputs submitted successfully.")
        except Exception as e:
            print("Failed to submit tool outputs:", e)
    else:
        print("No tool outputs to submit.")

    if run.status == 'completed':
        print_thread(thread)
    else:
        print(f"Unexpected Thread Status {run.status}")

def run_thread_on_assistant(assistant, thread):
    print("Running Thread on Assistant...")
    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=assistant.id,
        max_prompt_tokens=50000,
        max_completion_tokens=50000,
        # instructions="Please address the user as Jane Doe and create a quiz based on the documents."
    )

    print(f"Run Finished: {run.status}\n"
          f"Run Completion Tokens: {run.usage.completion_tokens}\n"
          f"Run Prompt Tokens: {run.usage.prompt_tokens}\n"
          f"Run Total Tokens: {run.usage.total_tokens}\n")
    if run.status == 'completed':
        print_thread(thread)

    if run.status == 'requires_action':
        handle_tools(run, thread)


def generate_quiz():
    assistant = create_or_find_assistant()
    vector_store = create_or_find_vector_store(assistant)
    thread = create_thread()
    add_message_to_thread(thread, message='Create a quiz with exactly 20 questions and reference the files used. Multiple choice quiz with 4 options.')
    run_thread_on_assistant(assistant, thread)

if __name__ == "__main__":
    generate_quiz()