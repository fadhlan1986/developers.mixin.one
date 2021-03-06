# Multisigs

Before you can operate a raw transaction, it should be created a multisigs request first. 

### Create Multisigs Request
```
POST /multisigs/requests
```

| Name | Type | Description |
| :----- | :----: | :---- |
| action | String | OPTION, String: unlock, sign |
| raw | String | implementation of go and js provided by us [code](https://github.com/MixinNetwork/multisig-bot/tree/master/src/utils) |

```
$$XIN:curl$$ "https://api.mixin.one/multisigs/requests --data '{"action": "sign", "raw": "298281....4952f95768b7d1a925c4189b912c343dbb000180e"}'
```

```json
{  
  "data":{  
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
```

### Multisigs Actions
```
POST /multisigs/requests/:id/:action
```

| Name | Type | Description |
| :----- | :----: | :---- |
| action | String | cancel, sign, unlock |
| pin | String | encrypted pin |

```
$$XIN:curl$$ "https://api.mixin.one/multisigs/requests/:id/:action --data '{"pin": ""}'
```

```json
{  
  "data":{  
    "type":"multisig_request",
    "request_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "user_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
    "asset_id":"43d61dcd-e413-450d-80b8-101d5e903357",
    "amount":"10",
    "threshold":"2",
    "senders": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "receivers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "signers": ["ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35", "ab56be4c-5b20-41c6-a9c3-244f9a433f35"],
    "memo":"hello",
    "action":"sign",
    "state": "spent",
    "transaction_hash": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "raw_transaction": "298281....4952f95768b7d1a925c4189b912c343dbb000180e",
    "created_at":"2018-05-03T10:08:34.859542588Z",
    "code_id":"ab56be4c-5b20-41c6-a9c3-244f9a433f35",
  }
}
```

### Examples

- Sign multisigs

  ```json
  POST /multisigs/requests
  {
    "action": "sign",
    "raw": "298281....000180e"
  }

  POST /multisigs/requests/:id/sign
  ```

- Cancel multisigs

  ```json
  POST /multisigs/requests
  {
    "action": "sign",
    "raw": "298281....000180e"
  }

  POST /multisigs/requests/:id/cancel
  ```

- Revoke multisigs

  ```json
  POST /multisigs/requests
  {
    "action": "unlock",
    "raw": "298281....000180e"
  }

  POST /multisigs/requests/:id/unlock
  ```

