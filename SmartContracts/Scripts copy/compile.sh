#!/bin/bash

# Navigate to the directory where the script is located
cd "$(dirname "$0")"

# Go one directory back to reach the project root
cd ..

#Compile the code
eosio-cpp -I Game/p2ewgamelogi/include -o Game/p2ewgamelogi/build/p2ewgamelogi.wasm Game/p2ewgamelogi/src/p2ewgamelogi.cpp --abigen