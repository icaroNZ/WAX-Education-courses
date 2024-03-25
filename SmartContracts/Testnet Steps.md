# Wax Testnet accounts and keys

Private key for testnet local wallet
```bash
PW5JnxJfaTYriibCrzbH4GrSXJKHfKdF2kCiXxs4qsSTAnCGKs8jd
```

```json
{
    "msg": "succeeded",
    "keys": {
        "active_key": {
            "public": "EOS6NgCuYdzwvGXb1qNoCEZbUbSaoT7RspeAJ1c7LAUsmoreBqXMp",
            "private": "5K5sNWMNe7UPGe2PKnqVuNuChqP458X7b17zwpzXBeaR69km59q"
        },
        "owner_key": {
            "public": "EOS7eY55pvKbk2ZYtTD3UDZiXXBDdncFkEpyjZ18K5rVFxH98YDmn",
            "private": "5JgTSbLok4AfzpbKyyyCN6awaJAnejCR1YchMKHucZ7aEVyLdjD"
        }
    },
    "account": "p2ewgametken"
}

        {
    "msg": "succeeded",
    "keys": {
        "active_key": {
            "public": "EOS88VzC8ENTZqQvk1sxdtkfnvQ2DHmaAk55oFVLwqprAXNhkE11w",
            "private": "5HyYSszwRmqm6pSeuwHZ9tyXLt6yn3tdjWa23yta2CHDpnkMvUM"
        },
        "owner_key": {
            "public": "EOS7XnJfqh1PWMKoeTbD61yKLmjsu1op59WdRV5M6YVkgzqkqYgEC",
            "private": "5KRmimLHG8Qck3YTSN5pjNH6DUGXHE4eeaJ8y7Ta4JJUCibQagW"
        }
    },
    "account": "p2ewgamelogi"
}
```

## Import wallet keys:
```bash
cleos wallet import --name testnet --private-key 5HyYSszwRmqm6pSeuwHZ9tyXLt6yn3tdjWa23yta2CHDpnkMvUM
cleos wallet import --name testnet --private-key 5K5sNWMNe7UPGe2PKnqVuNuChqP458X7b17zwpzXBeaR69km59q
c get account p2ewgametken
c get account p2ewgamelogi
```

## Adding ram to the account
```bash
c system buyram p2ewgametken p2ewgametken --kbytes 500
```

## Deplying the smart contract
```bash
c set contract p2ewgametken Token p2ewgametken.wasm --abi p2ewgametken.abi -p p2ewgametken@active
```

## Creating the tokens on the testnet
```bash
c push action p2ewgametken create '["p2ewgametken", "1000000000.0000 GOLD"]' -p p2ewgametken@active
c push action p2ewgametken create '["p2ewgametken", "1000000000.0000 WOOD"]' -p p2ewgametken@active
c push action p2ewgametken create '["p2ewgametken", "1000000000.0000 FOOD"]' -p p2ewgametken@active
c push action p2ewgametken issue '["p2ewgametken", "1000000000.0000 GOLD", "memo"]' -p p2ewgametken@active
c push action p2ewgametken issue '["p2ewgametken", "1000000000.0000 WOOD", "memo"]' -p p2ewgametken@active
c push action p2ewgametken issue '["p2ewgametken", "1000000000.0000 FOOD", "memo"]' -p p2ewgametken@active
```
## Adding ram to the account
```bash
c system buyram p2ewgamelogi p2ewgamelogi --kbytes 1000
```

## Deplying the smart contract
```bash
c set contract p2ewgamelogi Game/p2ewgamelogi p2ewgamelogi.wasm --abi p2ewgamelogi.abi -p p2ewgamelogi@active
```

## Create test accounts:
```json
{"msg": "succeeded", "keys": {"active_key": {"public": "EOS5tc4HPo6oBSheSrbuBbMVhq6ERkEeD3wxvfpSCWPmcYA7ipfJr", "private": "5KU5qiZBEWQ1H1V6xu7N8Xwp6gaqz2cWQZJmwVu2ePHVcMEB6Wt"}, "owner_key": {"public": "EOS87AhUG6s695MJ6DyauHXRxu3uxayP6V4HGytgf2GGfUDqSeabx", "private": "5JxBKBHnnw6b6fjX2WhaFHNB8qFfB8qmYVCp5RejkPRPoZvTsVj"}}, "account": "p2ewtestacc1"}

{"msg": "succeeded", "keys": {"active_key": {"public": "EOS7BdaJ9bBBr25xxQP4zkwa7MLEPsU6j2HMvk2afG5DRukevg9NX", "private": "5KTX5GxnCm7YLQS43q9qCvfb6KRwvjuFPSPezm8Wva83MrDP5iT"}, "owner_key": {"public": "EOS8LVs4QvoqoNikWT6PcmhVjNRYvcttm2mZyxpSGRGS7bqqLg5XT", "private": "5KFvsMcKy9Mi1nSugBeqwCGgZxhojwtma3JZWMQyZfqzbw5PME5"}}, "account": "p2ewtestacc2"}
```

## Create a new account into the game
```bash
cleos push action p2ewgamelogi addaccount '["p2ewtestacc1"]'
```