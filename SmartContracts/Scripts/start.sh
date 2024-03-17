#!/bin/bash

# Start nodeos and redirect both stdout and stderr to nodeos.log in the background
nodeos -e -p eosio \
--plugin eosio::producer_plugin \
--plugin eosio::chain_api_plugin \
--plugin eosio::http_plugin \
--access-control-allow-origin='*' \
--contracts-console \
--http-validate-host=false \
--verbose-http-errors >> nodeos.log 2>&1 &

# Wait a little bit to ensure nodeos has started
sleep 10

# Unlock the default wallet
cleos wallet unlock --password PW5JHQ8SbuSBuDfWJFs5ZsHNum2JnHVguzASF8trW87DJfEp4HdAc

# Unlock another wallet named 'accounts'
cleos wallet unlock -n accounts --password PW5HpuncN2BfzUcRi1PdS32nWi3FuwsvSsNVc2WCLnGmvCNNdtKj1
