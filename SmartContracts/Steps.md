## Start Nodeos
```bash
nodeos -e -p eosio \
--plugin eosio::producer_plugin \
--plugin eosio::chain_api_plugin \
--plugin eosio::http_plugin \
--access-control-allow-origin='*' \
--contracts-console \
--http-validate-host=false \
--verbose-http-errors >> nodeos.log 2>&1 &
```
# Create wallet
```bash
cleos wallet create --to-console
```
PW5K5VyLzPrRzp9mi3XpJ5dhyuu2DuLLxR9BFjvirAV9SbRvnWw5P
```bash
cleos wallet create -n p2ewgametken --to-console
```
Wallet name: p2ewgametken
PW5JEBddUYHHQLjCrCq5QiAAteJbeu9f8o8zWvVEeXomaRVnjW3eT

# Import eosio private key
```bash
cleos wallet import
```
EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV