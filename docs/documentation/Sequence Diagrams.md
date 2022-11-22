# Sequence Diagrams

::: warning
**Under Development**
:::

## G2P payment through mojaloop switch

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
activate PIL #violet

PIL -> PayerFSP: Bulk Transfer
activate PayerFSP #PapayaWhip

PayerFSP -> ML: Bulk Transfer
ML -> PayeeFSP: Individual Transfers

PayeeFSP --> ML: Transfer Response
ML --> PayerFSP: Bulk Transfer Response

PayerFSP --> PIL: Bulk Transfer Response
deactivate PayerFSP

PIL --> SPP: Money Disbursed
deactivate PIL

PayeeFSP --> User: Notification
deactivate SPP

@enduml

<br/>

## Thridparty transfer in mojaloop out of a fhir invoice


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
PISP -> ML: Transfer Initiation Request
ML -> PayerFSP: Transfer Initiation Request

PayerFSP -> ML: Transfer Request
ML -> PayeeFSP: Transfer Request

PayeeFSP --> ML: Transfer Response
PayeeFSP --> User: Notification
ML --> PayerFSP: Transfer Response

ML --> PISP: Transfer Response Notification

PISP --> PIL: Payment Done
PIL --> SPP: Money Disbursed
deactivate PIL
deactivate SPP

@enduml
