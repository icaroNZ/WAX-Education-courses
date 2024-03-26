#!/bin/bash

# Check if exactly two arguments are passed (asset amount and token type)
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 amount token"
    echo "Example: $0 1.0000 GOLD"
    exit 1
fi

# Assign the script arguments to variables
amount="$1"
token="$2"

# List of valid tokens
valid_tokens=("FOOD" "WOOD" "GOLD")

# Check if the token is valid
if [[ ! " ${valid_tokens[@]} " =~ " ${token} " ]]; then
    echo "Invalid token. Valid tokens are: FOOD, WOOD, GOLD"
    exit 2
fi

# Execute the cleos command
cleos push action p2ewgametken transfer "[\"acc1\", \"p2ewgamelogi\", \"${amount} ${token}\", \"Deposit\"]" -p acc1@active