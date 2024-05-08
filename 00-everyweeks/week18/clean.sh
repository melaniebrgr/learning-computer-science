#!/bin/bash

API_KEY="COPY-PASTE-THE-KEY-HERE"

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