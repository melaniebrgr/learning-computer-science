#!/bin/bash

API_KEY="API_KEY_HERE"

remove_file() {
    FILE_ID="$1"
    curl -X DELETE "https://api.openai.com/v1/files/$FILE_ID" \
         -H "Authorization: Bearer $API_KEY" \
         -H "Content-Type: application/json"
}

file_list=$(curl -s -X GET "https://api.openai.com/v1/files" \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json")

remove_all_files() {
    for id in $(echo "$file_list" | jq -r '.data[].id'); do
        remove_file "$id"
    done
}

remove_all_files

remove_vector_store() {
    VECTOR_STORE_ID="$1"
    curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -H "OpenAI-Beta: assistants=v2" \
        -X DELETE
}

vector_store_list=$(curl https://api.openai.com/v1/vector_stores \
        -H "Authorization: Bearer $API_KEY" \
        -H "Content-Type: application/json" \
        -H "OpenAI-Beta: assistants=v2")

remove_all_vector_stores() {
    for id in $(echo "$vector_store_list" | jq -r '.data[].id'); do
        remove_vector_store "$id"
    done
}

remove_all_vector_stores