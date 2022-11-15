# Payments Interoperability Layer
Payments Interoperability Layer to interact with Payment Execution Systems

## Proposed Architecture
![Proposed Architecture Diagram](assets/images/architecture-diagram.png)

## Levels of API

- Social Protection Programs call an API to perform actions related to payments.
- Payments Interoperability Layer calls API(s) to interact with Payment Execution Systems
  - APIs defined by Financial Institutions
  - APIs defined by payment switches which support Third Party Payment Initiation.
    - These are discussed with Open Banking initiatives.
- If there is a payments switch in place, Financial Institutions call its API to route payments between them.
  - These APIs are not used by the Payments Interoperability Layer. We therefore exclude them from this discussion.
