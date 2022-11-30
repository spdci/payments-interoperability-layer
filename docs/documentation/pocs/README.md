# Proof of concept implementation

A proof of concept of the proposed Payments Interoperability Layer has been built. This proof of concept includes the following components:

1.  A demo user interface which simulates an SPP interacting with a Payments Interoperability Layer using a standard interface.

2.  A Payments Interoperability Layer which processes requests from the SPP and translates them into execution requests for two kinds of Payment Execution System:

    1.  A DFSP interface which executes the payment via a simulated FDSP attached to a Mojaloop system.

    2.  A 3PPI interface which provides direct access to a Mojaloop system.

3.  A simulation of a user interface which shows a payment notification.

Schematic representations of the components of the two systems are shown in the following pages.
