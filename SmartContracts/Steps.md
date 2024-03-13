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

## Create Account
```bash
cleos create account eosio eosio.token EOS6eKVqVbrzp5CC3cY1hwTqHD5Z893YMDzz5ak2uSQegvbkTq3vK
```
