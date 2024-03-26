#!/bin/bash


# Execute the cleos command
cleos --url http://waxtest.eu.eosamsterdam.net  push action p2ewgametken transfer '["p2ewgametken", "p2ewtestacc1", "9000.0000 GOLD", "Deposit"]' -p p2ewgametken@active
cleos --url http://waxtest.eu.eosamsterdam.net  push action p2ewgametken transfer '["p2ewgametken", "p2ewtestacc1", "9000.0000 WOOD", "Deposit"]' -p p2ewgametken@active
cleos --url http://waxtest.eu.eosamsterdam.net  push action p2ewgametken transfer '["p2ewgametken", "p2ewtestacc1", "9000.0000 FOOD", "Deposit"]' -p p2ewgametken@active

cleos --url http://waxtest.eu.eosamsterdam.net  push action p2ewgametken transfer '["p2ewtestacc1", "p2ewgamelogi", "9000.0000 GOLD", "Deposit"]' -p p2ewtestacc1@active
cleos --url http://waxtest.eu.eosamsterdam.net  push action p2ewgametken transfer '["p2ewtestacc1", "p2ewgamelogi", "9000.0000 WOOD", "Deposit"]' -p p2ewtestacc1@active
cleos --url http://waxtest.eu.eosamsterdam.net  push action p2ewgametken transfer '["p2ewtestacc1", "p2ewgamelogi", "9000.0000 FOOD", "Deposit"]' -p p2ewtestacc1@active