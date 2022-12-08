# Payment via a DFSP interface

This is PoC for a G2P payment using a sample implementation of `Payments Interoperability Layer`.
The Payments Interoperability Layer in this PoC takes API requests from Social Protection Program (SPP) and executes a transfer through a mojaloop payments switch.

The demo uses the following components
- SPP Demo UI - A sample demo UI developed simulating a `Social Protection Program`
- Payment Interoperablity Layer - A sample implementation of `Payments Interoperability Layer` with direct FSP connectivity.
- Mojaloop Payment Manager - As a sender FSP implementation
- Mojaloop Testing Toolkit - Simulates the Mojaloop switch and receiver FSP
- Mojaloop Testing Toolkit Mobile Application Simuators - To get the notifications of the inbound payments to beneficiaries.

The code is available [here](https://github.com/sp-convergence/mojaloop-g2p-poc-demo)

## Use Case Diagram

![G2P Use Case Diagram](/payments-interoperability-layer/assets/g2p-usecase.svg)

## Component Diagram

![G2P Component Diagram](/payments-interoperability-layer/assets/mojaloop-g2p-poc.drawio.svg)

## Sequence Diagram

@startuml

skinparam sequenceArrowThickness 2
skinparam roundcorner 20
skinparam maxmessagesize 60

skinparam ParticipantPadding 20
skinparam BoxPadding 10
skinparam SequenceBoxBackgroundColor AliceBlue
skinparam ActorBorderColor    SaddleBrown

participant "Social Protection Program" as SPP #white
participant "Payment Interoperability Layer" as PIL #white

box "Payment Execution System"
participant "Sender Bank" as PayerFSP
participant "Mojaloop Switch" as ML #white
participant "Receiver Bank" as PayeeFSP #white
end box
actor "John Doe" as User #SaddleBrown

'User -> SPP: Registration
activate SPP

SPP -> PIL: Disburse Money
note right of SPP: POST /disbursement
activate PIL #violet

loop For each beneficiary
    PIL -> PayerFSP: Transfer Request
    note right of PIL: POST /sendmoney

    PayerFSP -> ML: Party Lookup
    note right of PayerFSP: GET /parties
    activate PayerFSP #PapayaWhip
    ML -> PayeeFSP: Party Lookup
    note right of ML: GET /parties
    activate PayeeFSP #PapayaWhip
    PayeeFSP --> ML: Party Information
    note left of PayeeFSP: PUT /parties
    deactivate PayeeFSP
    ML --> PayerFSP: Parties Information
    note left of ML: PUT /parties
    deactivate PayerFSP


    PayerFSP -> ML: Bulk Quotes
    note right of PayerFSP: POST /quotes
    activate PayerFSP #PapayaWhip
    ML -> PayeeFSP: Bulk Quotes
    note right of ML: POST /quotes
    activate PayeeFSP #PapayaWhip
    PayeeFSP --> ML: Bulk Quotes Response
    note left of PayeeFSP: PUT /quotes
    deactivate PayeeFSP
    ML -> PayerFSP: Bulk Quotes Response
    note left of ML: PUT /quotes
    deactivate PayerFSP

    PayerFSP -> ML: Bulk Transfers
    note right of PayerFSP: POST /transfers
    activate PayerFSP #PapayaWhip
    ML -> PayeeFSP: Bulk Transfers
    note right of ML: POST /transfers
    activate PayeeFSP #PapayaWhip
    PayeeFSP --> ML: Bulk Transfers Response
    note left of PayeeFSP: PUT /transfers
    deactivate PayeeFSP
    ML --> PayerFSP: Bulk Transfers Response
    note left of ML: PUT /transfers
    deactivate PayerFSP

    PayerFSP --> PIL: Transfer Response
    'deactivate PayerFSP
end loop

PIL --> SPP: Money Disbursed
deactivate PIL

PayeeFSP --> User: Notification
deactivate SPP

@enduml


## Demo Video
<iframe width="560" height="315" src="https://www.youtube.com/embed/04xuvcd6-ak?start=1740" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
