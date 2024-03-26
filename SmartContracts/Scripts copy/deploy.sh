#!/bin/bash

# Navigate to the directory where the script is located
cd "$(dirname "$0")"

# Go one directory back to reach the project root
cd ..

#Deploy the Smart Contract
cleos set contract p2ewgamelogi Game/p2ewgamelogi/build p2ewgamelogi.wasm --abi p2ewgamelogi.abi -p p2ewgamelogi@active