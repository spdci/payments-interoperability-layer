# Sequence Diagrams

## Interacting with DFSP Interfaces

@startuml

title Transferring funds via DFSP Interfaces

participant "Social\nProtection\nProgram" as 1SPP
participant "API Layer" as 1API
box "Payment Interoperability Layer" #LightBlue
    participant "Payment\nExecution\nService" as P1
    participant "Payability\nService" as P2
    participant "Address\nResolution\nService" as P3
    participant "Synonym\nService" as P4
end box
box "Address Resolution Adapters" #LightCoral
    participant "Directory\nService 1" as A1
    participant "Directory\nService 2" as A2
end box
box "Payment Execution Adapters" #LightGreen
    participant "DFSP A\nAdapter" as E1
    participant "DFSP B\nAdapter" as E2
    participant "PISP\nAdapter" as E3
end box
box "Payment Switch" #LightSkyBlue
    participant "Bank A" as D1
    participant "Bank B" as D2
    participant "Mobile\nWallet 1" as D3
    participant "Mobile\nWallet 2" as D4
    participant "Switch" as 1S
    participant "Address\nResolution\nService" as 1A
end box

autonumber 

activate 1SPP
1SPP->1API:Please process\nthis beneficiary list

note over 1SPP

POST /disbursement

{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "note": "Old Age Allowance",
  "payeeList": [
    {
        "identifier": {
            "payeeIdType": "NATIONAL_ID",
            "payeeIdValue": "345678912"
        },
        "amount": {
            "amount": 100,
            "currency": "INR"
        }
    },
    {
        "identifier": {
            "payeeIdType": "MOBILE",
            "payeeIdValue": "9848123871"
        },
        "amount": {
            "amount": 100,
            "currency": "INR"
        }
    },
    {
        "identifier": {
            "payeeIdType": "NATIONAL_ID",
            "payeeIdValue": "6081571774"
        },
        "amount": {
            "amount": 100,
            "currency": "INR"
        }
    }
  ]
}


end note

activate 1API
1API-->1SPP:200 Gotcha
1API->P1:Please process\nthis beneficiary list
activate P1
deactivate 1API
P1->P1:Has this list been\nchecked for payability?
alt No
    P1->P2:Please check this list\nfor payability.
    activate P2
    P2->P2:Has this list been\nchecked for addressability?
    alt No
        P2->P3:Please check this\nlist for addressability
        activate P3
        P3->P3:Has this list been\nchecked for synonyms?
        alt No
            P3->P4:Please check this\nlist for synonyms
            activate P4
            P4->P4:Have all these entries\nbeen checked for synonyms?
            alt No
            loop For each unchecked entry
            P4->P4:Have I a synonym for\nthis entry?
            P4->P4:If so, write it\ninto the list
            end loop
            P4->P3:Return the results
            note over P4

            {
            "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
            "note": "Old Age Allowance",
            "payeeList": [
                {
                    "identifier": {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "345678912",
                        "synonyms": []
                    },
                    "amount": {
                        "amount": 100,
                        "currency": "INR"
                    }
                },
                {
                    "identifier": {
                        "payeeIdType": "MOBILE",
                        "payeeIdValue": "9848123871",
                        "synonyms": [
                            {
                                "payeeIdType": "NATIONAL_ID",
                                "payeeIdValue": "1795058598"
                            }
                        ]
                    },
                    "amount": {
                        "amount": 100,
                        "currency": "INR"
                    }
                },
                {
                    "identifier": {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "6081571774",
                        "synonyms": []
                    },
                    "amount": {
                        "amount": 100,
                        "currency": "INR"
                    }
                }
            ]
            }
            end note
            deactivate P4
        end
    end
    P3->P3:Can these identifiers\nbe matched to accounts?
    loop For each known address resolution service
        P3->A1:Do you know about these identifiers?
        activate A1
        loop For each identifier
            A1->1S:Do you know about this identifier?
            activate 1S
            1S->1A:Do you know about\nthis identifier?
            activate 1A
            1A->1A:Check them out
            1A-->1S:The first two yes,\nthe third one no
            deactivate 1A
            1S-->A1:The first two yes,\nthe third one no.
            deactivate 1S
        end loop
        A1-->P3:The first two yes,\nthe third one no.
        deactivate A1
        P3->A2:Do you know about these identifiers?
        activate A2
        A2-->P3:Nope
        deactivate A2
    end loop
    P3-->P2:Here are the resultsfrom\nthe address resolution check
    note over P3

    {
    "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
    "note": "Old Age Allowance",
    "payeeList": [
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "345678912",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_1",
                "name": "Rabindranath Tagore"
            }
        },
        {
            "identifier": {
                "payeeIdType": "MOBILE",
                "payeeIdValue": "9848123871",
                "synonyms": [
                    {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "1795058598"
                    }
                ]
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_2",
                "name": "Sarojini Naidu"
            }
        },
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "6081571774",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            }
        }
    ]
    }
    end note
    end
    deactivate P3
    loop For each entry in the disbursement list
    P2->P2:Does this entry have\na reachable account?
    alt Yes
        P2->P2:Add to the payability list\nfor this PES adapter/DFSP combination
    else No
        P2->P2:Ignore
    end
    end loop
    loop For each list of reachable accounts
    P2->D1:Please see if these accounts can be paid
    activate D1
    D1->1S:Please see if these accounts can be paid
    activate 1S
    1S->D3:Please see if these accounts can be paid
    activate D3
    D3->D3:Yes, looks OK to me.
    D3-->1S:Yes, these accounts can be paid
    deactivate D3
    1S-->D1:Yes, these accounts can be paid
    deactivate 1S
    D1-->P2:Yes, these accounts can be paid
    deactivate D1
    end loop
    P2-->P1:Here are the results of the\npayability check
    note over P2

    {
    "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
    "note": "Old Age Allowance",
    "payeeList": [
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "345678912",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_1",
                "name": "Rabindranath Tagore"
            },
            "payable": "true"
        },
        {
            "identifier": {
                "payeeIdType": "MOBILE",
                "payeeIdValue": "9848123871",
                "synonyms": [
                    {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "1795058598"
                    }
                ]
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_2",
                "name": "Sarojini Naidu"
            },
            "payable": "true"
        },
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "6081571774",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            }
        }
    ]
    }
    end note
    deactivate P2
end

loop For each entry in the disbursement list
    P1->P1:Is this entry payable?
    alt Yes
        P1->P1:Add to correct PES/DFSP list
    else No
        P1->P1:Ignore
    end
end loop

loop For each PES/DFSP list
    P1->D1:Please execute these payments
    activate D1
    D1->1S:Please execute these payments
    activate 1S
    1S->D3:Please execute these payments
    activate D3
    D3->D3:I'm OK with these payments
    D3-->1S:I confirm the payments
    deactivate D3
    1S-->D1:Payments confirmed
    deactivate 1S
    D1-->P1:Payments confirmed
    P1->D1:Please execute these payments
    activate D1
    D1->1S:Please execute these payments
    activate 1S
    1S->D4:Please execute these payments
    activate D4
    D4->D4:I'm OK with these payments
    D4-->1S:I confirm the payments
    deactivate D4
    1S-->D1:Payments confirmed
    deactivate 1S
    D1-->P1:Payments confirmed
end loop

P1->P1:Consolidate results set

P1->SPP:Here are your payment results
deactivate P1
deactivate SPP

@enduml


## Interacting with PISP Interfaces

@startuml

title Transferring funds via PISP Interfaces

participant "Social\nProtection\nProgram" as 1SPP
participant "API Layer" as 1API
box "Payment Interoperability Layer" #LightBlue
    participant "Payment\nExecution\nService" as P1
    participant "Payability\nService" as P2
    participant "Address\nResolution\nService" as P3
    participant "Synonym\nService" as P4
end box
box "Address Resolution Adapters" #LightCoral
    participant "Directory\nService 1" as A1
    participant "Directory\nService 2" as A2
end box
box "Payment Execution Adapters" #LightGreen
    participant "DFSP A\nAdapter" as E1
    participant "DFSP B\nAdapter" as E2
    participant "PISP\nAdapter" as E3
end box
box "Payment Switch" #LightSkyBlue
    participant "Bank A" as D1
    participant "Bank B" as D2
    participant "Mobile\nWallet 1" as D3
    participant "Mobile\nWallet 2" as D4
    participant "Switch" as 1S
    participant "Address\nResolution\nService" as 1A
end box

autonumber 

activate 1SPP
1SPP->1API:Please process\nthis beneficiary list

note over 1SPP

POST /disbursement

{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "note": "Old Age Allowance",
  "payeeList": [
    {
        "identifier": {
            "payeeIdType": "NATIONAL_ID",
            "payeeIdValue": "345678912"
        },
        "amount": {
            "amount": 100,
            "currency": "INR"
        }
    },
    {
        "identifier": {
            "payeeIdType": "MOBILE",
            "payeeIdValue": "9848123871"
        },
        "amount": {
            "amount": 100,
            "currency": "INR"
        }
    },
    {
        "identifier": {
            "payeeIdType": "NATIONAL_ID",
            "payeeIdValue": "6081571774"
        },
        "amount": {
            "amount": 100,
            "currency": "INR"
        }
    }
  ]
}


end note

activate 1API
1API-->1SPP:200 Gotcha
1API->P1:Please process\nthis beneficiary list
activate P1
deactivate 1API
P1->P1:Has this list been\nchecked for payability?
alt No
    P1->P2:Please check this list\nfor payability.
    activate P2
    P2->P2:Has this list been\nchecked for addressability?
    alt No
        P2->P3:Please check this\nlist for addressability
        activate P3
        P3->P3:Has this list been\nchecked for synonyms?
        alt No
            P3->P4:Please check this\nlist for synonyms
            activate P4
            P4->P4:Have all these entries\nbeen checked for synonyms?
            alt No
            loop For each unchecked entry
            P4->P4:Have I a synonym for\nthis entry?
            P4->P4:If so, write it\ninto the list
            end loop
            P4->P3:Return the results
            note over P4

            {
            "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
            "note": "Old Age Allowance",
            "payeeList": [
                {
                    "identifier": {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "345678912",
                        "synonyms": []
                    },
                    "amount": {
                        "amount": 100,
                        "currency": "INR"
                    }
                },
                {
                    "identifier": {
                        "payeeIdType": "MOBILE",
                        "payeeIdValue": "9848123871",
                        "synonyms": [
                            {
                                "payeeIdType": "NATIONAL_ID",
                                "payeeIdValue": "1795058598"
                            }
                        ]
                    },
                    "amount": {
                        "amount": 100,
                        "currency": "INR"
                    }
                },
                {
                    "identifier": {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "6081571774",
                        "synonyms": []
                    },
                    "amount": {
                        "amount": 100,
                        "currency": "INR"
                    }
                }
            ]
            }
            end note
            deactivate P4
        end
    end
    P3->P3:Can these identifiers\nbe matched to accounts?
    loop For each known address resolution service
        P3->A1:Do you know about these identifiers?
        activate A1
        loop For each identifier
            A1->1S:Do you know about this identifier?
            activate 1S
            1S->1A:Do you know about\nthis identifier?
            activate 1A
            1A->1A:Check them out
            1A-->1S:The first two yes,\nthe third one no
            deactivate 1A
            1S-->A1:The first two yes,\nthe third one no.
            deactivate 1S
        end loop
        A1-->P3:The first two yes,\nthe third one no.
        deactivate A1
        P3->A2:Do you know about these identifiers?
        activate A2
        A2-->P3:Nope
        deactivate A2
    end loop
    P3-->P2:Here are the resultsfrom\nthe address resolution check
    note over P3

    {
    "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
    "note": "Old Age Allowance",
    "payeeList": [
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "345678912",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_1",
                "name": "Rabindranath Tagore"
            }
        },
        {
            "identifier": {
                "payeeIdType": "MOBILE",
                "payeeIdValue": "9848123871",
                "synonyms": [
                    {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "1795058598"
                    }
                ]
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_2",
                "name": "Sarojini Naidu"
            }
        },
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "6081571774",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            }
        }
    ]
    }
    end note
    end
    deactivate P3
    loop For each entry in the disbursement list
    P2->P2:Does this entry have\na reachable account?
    alt Yes
        P2->P2:Add to the payability list\nfor this PES adapter/DFSP combination
    else No
        P2->P2:Ignore
    end
    end loop
    loop For each list of reachable accounts
    P2->E1:Please see if these accounts can be paid
    activate E1
    E1->D1:Please see if these accounts can be paid
    activate D1
    D1->1S:Please see if these accounts can be paid
    activate 1S
    1S->D3:Please see if these accounts can be paid
    activate D3
    D3->D3:Yes, looks OK to me.
    D3-->1S:Yes, these accounts can be paid
    deactivate D3
    1S-->D1:Yes, these accounts can be paid
    deactivate 1S
    D1-->E1:Yes, these accounts can be paid
    deactivate D1
    E1-->P2:Yes, these accounts can be paid
    deactivate E1
    end loop
    P2-->P1:Here are the results of the\npayability check
    note over P2

    {
    "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
    "note": "Old Age Allowance",
    "payeeList": [
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "345678912",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_1",
                "name": "Rabindranath Tagore"
            },
            "payable": "true"
        },
        {
            "identifier": {
                "payeeIdType": "MOBILE",
                "payeeIdValue": "9848123871",
                "synonyms": [
                    {
                        "payeeIdType": "NATIONAL_ID",
                        "payeeIdValue": "1795058598"
                    }
                ]
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            },
            "reachable": {
                "adapter": "PES_1",
                "dfsp": "Wallet_2",
                "name": "Sarojini Naidu"
            },
            "payable": "true"
        },
        {
            "identifier": {
                "payeeIdType": "NATIONAL_ID",
                "payeeIdValue": "6081571774",
                "synonyms": []
            },
            "amount": {
                "amount": 100,
                "currency": "INR"
            }
        }
    ]
    }
    end note
    deactivate P2
end

loop For each entry in the disbursement list
    P1->P1:Is this entry payable?
    alt Yes
        P1->P1:Add to correct PES/DFSP list
    else No
        P1->P1:Ignore
    end
end loop

loop For each PES/DFSP list
    P1->E3:Please execute these payments
    activate E3
    E3->D1:Please execute these payments
    activate D1
    D1->1S:Please execute these payments
    activate 1S
    1S->D3:Please execute these payments
    activate D3
    D3->D3:I'm OK with these payments
    D3-->1S:I confirm the payments
    deactivate D3
    1S-->D1:Payments confirmed
    deactivate 1S
    D1-->E3:Payments confirmed
    deactivate D1
    E3-->P1:Payments confirmed
    deactivate E3
    P1->E3:Please execute these payments
    activate E3
    E3->D2:Please execute these payments
    activate D2
    D2->1S:Please execute these payments
    activate 1S
    1S->D4:Please execute these payments
    activate D4
    D4->D4:I'm OK with these payments
    D4-->1S:I confirm the payments
    deactivate D4
    1S-->D2:Payments confirmed
    deactivate 1S
    D2-->E3:Payments confirmed
    deactivate D2
    E3-->P1:Payments confirmed
    deactivate E3
end loop

P1->P1:Consolidate results set

P1->SPP:Here are your payment results
deactivate P1
deactivate SPP

@enduml