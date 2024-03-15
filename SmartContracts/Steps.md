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

# Wallet Commands

## Create Wallet
```bash
cleos wallet create --to-console
```
Private Key
```bash
PW5JHQ8SbuSBuDfWJFs5ZsHNum2JnHVguzASF8trW87DJfEp4HdAc
```
Owner Key:
```bash
EOS6eKVqVbrzp5CC3cY1hwTqHD5Z893YMDzz5ak2uSQegvbkTq3vK
```
## List, lock and unlock wallet
```bash
cleos wallet list
cleos wallet lock
cleos wallet unlock
```

## Import Private Key
```bash
cleos wallet import --private-key PW5JHQ8SbuSBuDfWJFs5ZsHNum2JnHVguzASF8trW87DJfEp4HdAc
```
## Create Keys
```bash
cleos wallet create_key
```
## Create Account
```bash
cleos create account eosio p2ewgametken EOS6eKVqVbrzp5CC3cY1hwTqHD5Z893YMDzz5ak2uSQegvbkTq3vK
```

## Compile Contract
```bash
eosio-cpp -I include -o p2ewgametken.wasm src/p2ewgametken.cpp --abigen
```

## Deploy Contract
```bash
cleos set contract p2ewgametken Token/p2ewgametken --abi p2ewgametken.abi -p p2ewgametken@active
```

## Create Token
```bash
cleos push action p2ewgametken create '["p2ewgametken", "1000000000.0000 GOLD"]' -p p2ewgametken@active
cleos push action p2ewgametken create '["p2ewgametken", "1000000000.0000 WOOD"]' -p p2ewgametken@active
cleos push action p2ewgametken create '["p2ewgametken", "1000000000.0000 FOOD"]' -p p2ewgametken@active
cleos push action p2ewgametken issue '["p2ewgametken", "1000000000.0000 GOLD", "memo"]' -p p2ewgametken@active
cleos push action p2ewgametken issue '["p2ewgametken", "1000000000.0000 WOOD", "memo"]' -p p2ewgametken@active
cleos push action p2ewgametken issue '["p2ewgametken", "1000000000.0000 FOOD", "memo"]' -p p2ewgametken@active
```

## Check tables
```bash
cleos get table p2ewgametken p2ewgametken accounts
cleos get table p2ewgametken GOLD stat
cleos get table p2ewgametken WOOD stat
cleos get table p2ewgametken FOOD stat
```

## Accounts wallet Private key
```bash
PW5HpuncN2BfzUcRi1PdS32nWi3FuwsvSsNVc2WCLnGmvCNNdtKj1
acc1: EOS8KV5GTiR3Y9G3MEadt2tSjRxDx9BQZ1ZeP4NEAbaWUx3NrrCo1
acc2: EOS5EvHLysBkGiLh7Fc1jqGL7wFZdjSgG1SChUxFizhEUkX82wGHp
```