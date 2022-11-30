# Payment via a DFSP interface

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
activate PIL #violet

PIL -> PayerFSP: Bulk Transaction

PayerFSP -> ML: Party Lookups
activate PayerFSP #PapayaWhip
ML -> PayeeFSP: Party Lookup
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Party Information
deactivate PayeeFSP
ML --> PayerFSP: Parties Information
deactivate PayerFSP


PayerFSP -> ML: Bulk Quotes
activate PayerFSP #PapayaWhip
ML -> PayeeFSP: Bulk Quotes
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Bulk Quotes Response
deactivate PayeeFSP
ML -> PayerFSP: Bulk Quotes Response
deactivate PayerFSP

PayerFSP -> ML: Bulk Transfers
activate PayerFSP #PapayaWhip
ML -> PayeeFSP: Bulk Transfers
activate PayeeFSP #PapayaWhip
PayeeFSP --> ML: Bulk Transfers Response
deactivate PayeeFSP
ML --> PayerFSP: Bulk Transfers Response
deactivate PayerFSP

PayerFSP --> PIL: Bulk Transaction Response
'deactivate PayerFSP

PIL --> SPP: Money Disbursed
deactivate PIL

PayeeFSP --> User: Notification
deactivate SPP

@enduml

## Component Diagram

![G2P Component Diagram](/payments-interoperability-layer/assets/mojaloop-g2p-poc.drawio.svg)

## Demo Video
<iframe width="560" height="315" src="https://www.youtube.com/embed/04xuvcd6-ak?start=1740" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
