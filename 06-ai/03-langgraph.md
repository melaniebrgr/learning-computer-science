# LangGraph

LangGraph is a low-level orchestration framework for building, managing, and deploying long-running, stateful agents.

## Elements

- **State**: The _current_ state of the agent, which can be updated as the agent processes tasks. It is a knowledge source and communication channel to coordinate agents. It is like a meeting whiteboard where every participant (node) can read and write.
- **Nodes**: Individual operations that perform specific tasks in the graph. They typically take the state as an input, process it, and update the state or provide an output. Nodes are connected to form an assembly line of operations.
- **Graph**: The overarching structure connecting nodes, like a roadmap connecting cities (nodes) with highways (edges).
- **Edges**: Determine the flow of execution, like train tracks, with the train carrying the state that gets updated as the train moves from one station to another. There are normal and condition edges, that decide the next node to be executed.
- **Tools**: Specialised functions used within the nodes, like tools in a toolbox.
- **ToolNode**: A specialised node whose main job is to run a tool. It connects the node's output back into the state.
- **StateGraph**: One of the first elements interacted with. It builds and compiles the graph structure, ensuring the workflows run smoothly and data flows correctly.
- **Runnable**: Similar to runnable in langchain, it is the standard executable component. A runnable represents various representation. A node by contrast receives an updates state.

## Messages

- human message: input from the user
- ai message: output from a model
- system message: instructions or context for the model
- function message: output from a function call
- tool message: output from a tool

## Agent patterns

- router
- react agent
- reflection agent

![Agent Patterns](agent-patterns.png)
