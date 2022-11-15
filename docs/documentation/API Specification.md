# API Specification
One of the objectives of this workstream project is to provide the ability to trace a transfer end to end. In order to deliver on this objective, part of the reporting bounded context (BC) is to be built in line with the reference architecture.


### Roles API
The following table provides a summary of Roles API resources.

|Category|HTTP method|Endpoint| Description|Error codes|
| --- | --- | --- | --- | --- |
|**HEALTH**| | | | |
| | GET | /health | Used to return the current status of the API | 400, 401, 403, 404, 405, 406, 501, 503 |
| | GET | /metrics | Used to return metrics for the API | 400, 401, 403, 404, 405, 406, 501, 503|
|**PARTICIPANTS**| | | | |
| | GET | /participants | Used to return a list of participant IDs | 400, 401, 403, 404, 405, 406, 501, 503|
|**ROLES**| | | | |
| | GET | /roles | Used to return a list of role IDs |400, 401, 403, 404, 405, 406, 501, 503 |


### GraphQL query examples

**Query transfers that are filtered on a specific Payer DFSP**
```GraphQL
query GetTransfers {
  transfers(filter: {
    payer: "payerfsp"
  }) {
    transferId
    createdAt
    payee {
      name
    }
  }
}
```

**Query a summary of the transfers**
```GraphQL
query TransferSumary2021Q1 {
  transferSummary(
    filter: {
        currency: "USD"
        startDate: "2021-01-01"
        endDate: "2021-03-31"
    }) {
        count
        payer
  }
}
```
