
# Architecture of a payments building block

# Objective

The objective of a PBB is to manage the interactions between Social Protection Programs (SPP) and the Payment Execution Systems (PES) which are available in the jurisdiction where it is deployed, such that:

1.  Each SPP that uses it can interact with the PBB using an interface which allows sufficient flexibility for an SPP to configure its payments in any way it wants to, while not forcing the SPP to take account of the specific PESs in the jurisdiction where it is deployed.

2.  The SPP should not rely on assumptions about the nature of the PESs in the jurisdiction where it is deployed, or about the connections that might exist between them. This is equivalent to saying that a PBB should be capable of deployment in a jurisdiction where the payment infrastructure is as described in scenario 4 of [the GovStack Payments Building Block specification](https://docs.egovstack.net/v1.1.0/Payments_Building_Block_Specification_v1.1.0.pdf) (see Section 4.2.5): that is, where there is no interconnection between PESs except that provided by the PBB. A PBB which supports GovStack scenario 4 can support all the other GovStack scenarios.

# Overall architecture

The Payment Building Block provides a public interface which is intended to be accessed across the public internet. Its overall organisation uses a standard pattern for resources of this kind:

1.  The public component which receives requests from users and returns responses to them is a demilitarised zone (DMZ) which ensures that the operational components of the PBB are well protected against unrecognised actors and operations. The DMZ contains the following components.

    1.  An IP whitelisting service which enables PBB administrators to ensure that only requests from recognised endpoints are processed by the system.

    2.  A Role-based Access Control (RBAC) service, which ensures that access to individual elements of the PBB can be restricted to individual users.

    3.  A Mutual Transport Level Security (MTLS) component which allows the PBB to receive encrypted messages from recognised participants only, to decrypt them for processing and to re-encrypt the responses for security.

    4.  A JWS non-repudiation check to enable the PBB to verify that incoming messages in fact originated from the claimed sender, and that they have not been modified in transit by a man-in-the-middle attack.

    5.  A syntax check to confirm that incoming messages conform to the syntactic rules of the interface before significant effort is spent in processing them.

2.  The resource component, which contains the resources which are exposed to users of the PBB as API endpoints. The PBB supports the following major endpoints, each of which:

    1.  A synonyms endpoint. This allows users of the PBB to map between identifiers which they use and identifiers which are recognised by the PESs with which they will interact.

    2.  An address resolution endpoint. This allows an SPP to submit a list of identifiers, without payment instructions attached. The PBB will attempt to resolve each entry to a reachable account in a PES which it knows about, and will report the results back to the caller.

    3.  A payability endpoint. This allows an SPP to submit a list of identifiers with payment instructions attached. For each entry which is associated with a reachable account in a PES, the PBB will attempt to establish whether or not the amount specified can be paid to the account. It will report the results back to the caller.

    4.  A payment execution endpoint. This allows an SPP to submit a list of identifiers with payment instructions attached, and will attempt to execute the specified payment for each: *either* by transferring funds to the beneficiary’s account if the beneficiary has a reachable account, *or* by issuing an encashment certificate in a form specified by the configuration of the PBB if the beneficiary has no reachable account. The results will be reported back to the caller.

    5.  An incoming payments endpoint. This allows an SPP to receive information about payments made to a program specified by an account, either by periodically requesting information about payments received, or by subscribing to a publication which the PBB update with information about incoming payments as they are made.

3.  The Payments Interoperability Layer. This layer contains an administrative process for each of the endpoints specified above. The administrative process takes care of initial administration tasks, such as logging requests and retrieving stored lists if required. It then calls a service which performs the tasks associated with the endpoint. The content of these tasks is shown in more detail below.

The overall architecture of the Payments Building Block is as follows:

![Graphical user interface Description automatically generated](media/8a7145baca2bef1b0f47e7b78dc045bb.jpg)

The next sections describe the operation of individual services in the Payments Interoperability Layer.


![Proposed Architecture Diagram](../../../assets/images/architecture-diagram.png)
