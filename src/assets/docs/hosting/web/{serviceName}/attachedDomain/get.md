# List all the attached domains related to your web hosting

The OVH web hosting can contains multiple **multisites**. These feature is called **attached domains** into the OVH APIs.

This endpoint list all the attached domains linked on a specific web hosting.

---

## URL Parameters

| Parameter   | Description                                        | Can be null | example           |
|-------------|----------------------------------------------------|-------------|-------------------|
| serviceName | Domain name used as identifier of your web hosting |     no      | rondcoin.ovh      |
| path        | Filter all attached domains using a specific path  |     yes     | www/              |
| domain      | Filter the attached domain using a specific domain |     yes     | blog.rondcoin.ovh |

## Output example
```json
[
	"blog.rondcoin.ovh"
]
```

