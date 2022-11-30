# Payment via a 3PPI interface

This is PoC for a 3PPI payment using a sample implementation of `Payments Interoperability Layer`.
The OpenHIM service in this PoC takes FHIR invoice from any management information system like openIMIS and executes a transfer through a mojaloop payments switch using Payments Interoperability Layer.

The demo uses the following components
- Postman - A http client for sending FHIR invoice to openHIM
- OpenHIM - A middleware component to ease interoperability between different systems.
- OpenHIM Mediator - To be used with openHIM service which converts FHIR invoice to standard `Payments Interoperability Layer` payement request format.
- Payment Interoperablity Layer - A sample implementation of `Payments Interoperability Layer` with third party mojaloop connectivity
- Mojaloop Payment Manager - As a PISP (Payment Initiation Service Provider) implementation
- Mojaloop Testing Toolkit - Simulates the Mojaloop switch and receiver FSP
- Mojaloop Testing Toolkit Mobile Application Simuators - To get the notifications of the inbound payments to beneficiaries.

## Component Diagram

![FHIR PoC Component Diagram](/payments-interoperability-layer/assets/fhir-invoice-pisp-poc.drawio.svg)

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
participant "PISP (Payment Initiation Service Provider)" as PISP
participant "Mojaloop Switch" as ML #white
participant "Sender Bank" as PayerFSP
participant "Receiver Bank" as PayeeFSP #white
end box
actor "John Doe" as User #SaddleBrown

activate SPP

SPP -> PIL: Disburse Money
note right of SPP: POST /disbursement
activate PIL #violet
PIL -> PISP: Payment Request
note right of PIL: POST /sendmoney

PISP -> ML: Party Lookup
note right of PISP: GET /parties
activate PISP #PapayaWhip
ML -> PayeeFSP: Party Lookup
note right of ML: GET /parties
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Party Information
note left of PayeeFSP: PUT /parties
deactivate PayeeFSP
ML --> PISP: Party Information
note left of ML: PUT /parties
deactivate PISP

PISP -> ML: Third Party Transaction Request
note right of PISP: POST /thirdpartyRequests/transactions

activate PISP #PapayaWhip
ML -> PayerFSP: Third Party Transaction Request
note right of ML: POST /thirdpartyRequests/transactions

activate PayerFSP #PapayaWhip
PayerFSP -> PayerFSP: Verify the consent
PayerFSP --> ML: Third Party Transaction Response
note left of PayerFSP: PUT /thirdpartyRequests/transaction

ML --> PISP: Third Party Transaction Response
note left of ML: PUT /thirdpartyRequests/transaction
deactivate PISP

PayerFSP -> ML: Quotes Request
note left of PayerFSP: POST /quotes
ML -> PayeeFSP: Quotes Request
note right of ML: POST /quotes
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Quotes Response
note left of PayeeFSP: PUT /quotes
deactivate PayeeFSP
ML --> PayerFSP: Quotes Response
note right of ML: PUT /quotes
PayerFSP -> ML: Authorization Request
note left of PayerFSP: POST /thirdpartyRequests/authorizations

deactivate PayerFSP
ML -> PISP: Authorization Request
note left of ML: POST /thirdpartyRequests/authorizations
activate PISP #PapayaWhip

PISP -> ML: Approve Authorization
note right of PISP: PUT /thirdpartyRequests/authorizations
ML -> PayerFSP: Approve Authorization
note right of ML: PUT /thirdpartyRequests/authorizations
activate PayerFSP #PapayaWhip
PayerFSP -> PayerFSP: Verify Authorization

PayerFSP -> ML: Transfer Request
note left of PayerFSP: POST /transfers
ML -> PayeeFSP: Transfer Request
note right of ML: POST /transfers
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Transfer Response
note left of PayeeFSP: PUT /transfers
PayeeFSP --> User: Notification
deactivate PayeeFSP
ML --> PayerFSP: Transfer Response
note right of ML: PUT /transfers
PayerFSP --> ML: Third Party Transaction Response Notification
note left of PayerFSP: PATCH /thirdpartyRequests/transactions/{transactionRequestId}
deactivate PayerFSP
ML --> PISP: Third Party Transaction Response Notification
note left of ML: PATCH /thirdpartyRequests/transactions/{transactionRequestId}
deactivate PISP

PISP --> PIL: Payment Done
PIL --> SPP: Money Disbursed
deactivate PIL
deactivate SPP

@enduml
