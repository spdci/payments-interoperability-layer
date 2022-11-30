# Payment via a 3PPI interface

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
activate PIL #violet
PIL -> PISP: Payment Request

PISP -> ML: Party Lookup
activate PISP #PapayaWhip
ML -> PayeeFSP: Party Lookup
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Party Information
deactivate PayeeFSP
ML --> PISP: Party Information
deactivate PISP

PISP -> ML: Third Party Transaction Request
activate PISP #PapayaWhip
ML -> PayerFSP: Third Party Transaction Request
activate PayerFSP #PapayaWhip
PayerFSP -> PayerFSP: Verify the consent
PayerFSP --> ML: Third Party Transaction Response

ML --> PISP: Third Party Transaction Response
deactivate PISP

PayerFSP -> ML: Quotes Request
ML -> PayeeFSP: Quotes Request
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Quotes Response
deactivate PayeeFSP
ML --> PayerFSP: Quotes Response
PayerFSP -> ML: Authorization Request
deactivate PayerFSP
ML -> PISP: Authorization Request
activate PISP #PapayaWhip

PISP -> ML: Approve Authorization
ML -> PayerFSP: Approve Authorization
activate PayerFSP #PapayaWhip
PayerFSP -> PayerFSP: Verify Authorization

PayerFSP -> ML: Transfer Request
ML -> PayeeFSP: Transfer Request
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Transfer Response
PayeeFSP --> User: Notification
deactivate PayeeFSP
ML --> PayerFSP: Transfer Response
PayerFSP --> ML: Third Party Transaction Response Notification
deactivate PayerFSP
ML --> PISP: Third Party Transaction Response Notification
deactivate PISP

PISP --> PIL: Payment Done
PIL --> SPP: Money Disbursed
deactivate PIL
deactivate SPP

@enduml

## Component Diagram

![FHIR PoC Component Diagram](/assets/fhir-invoice-pisp-poc.drawio.svg)
