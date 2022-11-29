# Proof of concept implementation

A proof of concept of the proposed Payment Building Block has been built. This proof of concept includes the following components:

1.  A demo user interface which simulates an SPP interacting with a Payments Interoperability Layer using a standard interface.

2.  A Payments Interoperability Layer which processes requests from the SPP and translates them into execution requests for two kinds of Payment Execution System:

    1.  A DFSP interface which executes the payment via a simulated FDSP attached to a Mojaloop system.

    2.  A 3PPI interface which provides direct access to a Mojaloop system.

3.  A simulation of a user interface which shows a payment notification.

Schematic representations of the components of the two systems are shown below.


## Payment via a DFSP interface

### Sequence Diagram

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

### Component Diagram

![](media/f46f3a3b3e9a0b979b46219578e198df.png)

## Payment via a 3PPI interface

### Sequence Diagram

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

### Component Diagram

![](media/b50081798419cd85bc2fc90ba324cc77.png)
