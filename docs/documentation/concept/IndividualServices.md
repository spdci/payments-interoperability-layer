
# Individual services

This section describes the function of individual service resources in the Payments Interoperability Layer

## The synonym service.

The synonym service allows an SPP to associate an identifier which it uses to identify a beneficiary (or a payer in the case of inbound payments) with an identifier that is recognised by the PESs deployed in the jurisdiction. Some PESs required particular kinds of identifier (for instance, a Mobile Money service may require a mobile phone number as an identifier,) and this may be different from the identification that an SPP habitually uses: for instance, the SPP may want to identify all its beneficiaries by their National ID number. The synonym service allows the SPP to create an association, for example between the National ID and the mobile phone number, such that the SPP can continue to identify its beneficiaries by their National IDs, and these will be substituted where appropriate by the Payments Interoperability Layer so that payments can be executed by the target PES.

The synonym service has three sub-resources, as described below.

### Synonym Registration

The synonym registration service allows an SPP to associate two identifiers with each other, such that a request which contains one identifier (the inbound value) will have the other identifier (the substitute value) substituted before it is passed to the PES for execution of the payment. Each identifier consists of a type/value pair. Requests can be made for one or more identifier pairs in a single call to the Synonym Registration API (and hence to the synonym registration service.) Synonyms which are successfully registered will be stored in a synonym registry, which will be maintained by the synonym service.

If there is already an instance in the Synonym Registry with the same inbound value and the same substitute type, then the new entry will be added to the Synonym Registry and the old value will be disabled (meaning: a person has changed their identifier, for instance by getting a new phone.) If there is already an instance in the Synonym Registry with the same inbound value, but no entry for that inbound value has the same substitute type, then the new entry will be added to the Synonym Registry (meaning: this identifier is required for a particular PES.)

If the substitute value is blank, then the existing substitute value for that inbound value will be disabled. This is equivalent to deleting a synonym.

The registration service will also allow users to query the contents of the registry

### Synonym Substitution

The synonym substitution service allows internal components of the Payments Interoperability Layer to process a list of identifications (for instance, of beneficiaries.) For each identifier which is registered as a synonym, any substitute values will be inserted into the list as well as the inbound value. The values will be marked in the list which is returned to distinguish them from the input values.

### Synonym Reporting

The synonym reporting service allows an SPP to report on a set of synonyms. The SPP can submit a list of input values, and the synonym reporting service will return any synonyms which are associated with the input values. Alternatively, the SPP can request a report for all synonyms.

### Payments Interoperability Layer configuration

The following configuration items can be set at the Payments Interoperability Layer level for different implementations.

#### Synonym sharing

By default, each SPP will set up and maintain its own synonym service. However, a Payments Interoperability Layer can be set up to allow more than one SPP to share the same synonym set.

The following diagram shows the architectural schema of the synonym service.

![Synonym Service](/payments-interoperability-layer/assets/concept-synonym-service.drawio.svg)

## Account identification

The account identification service allows an SPP to submit a list of beneficiaries and to receive a report about which of those beneficiaries can be reached by the SPP, where “reached” means that a benefit can be credited to their account. The account identification service works in the following way.

1.  The SPP submits a list of beneficiaries to the account identification API. A beneficiary list has a header which will support the following options:

    1.  Full synonym check. If this option is selected, all the entries in the beneficiary list will be checked for synonyms. If it is not, only those entries which have not already been checked for synonyms will be checked.

    2.  Full identifier check. If this option is selected, every entry in the list will be checked for the presence of a reachable account. If it is not, only those entries which do not currently have a reachable account will be checked.

2.  The beneficiary list can include a reference to an existing beneficiary list. If it does, then the administrative process for the account identification service will retrieve the existing beneficiary list, and the entries in the beneficiary list submitted by the SPP will be treated as actions in relation to the existing list. If the beneficiary list does not contain a reference to an existing beneficiary list, then a new beneficiary list will be created and stored. The following actions are permitted:

    1.  ADD: the beneficiary in question will be added to the list.

    2.  DELETE: the beneficiary in question will be removed from the list.

3.  If there are any entries in the consolidated list for which synonym substitution has not been performed, or if a full synonym check has been requested, then the account identification service will call the synonym substitution service to add synonyms where they exist.

4.  If there are any entries in the beneficiary list which do not have entries in the identifier cache, then the account identification service will attempt to find a reachable account which is associated with each entry. This process is as follows:

    1.  Send a request to each of the directory service adapters which are attached to the Payments Interoperability Layer asking for a resolution of the identifier(s) associated with the entry.

    2.  Wait for a response from the directory service adapter(s).

    3.  If a directory service adapter responds, then load the response into the identifier cache. The response will include both the DFSP which holds an account identified by the identifier, and the PES to which that DFSP belongs.

5.  Construct an identifier list from the entries in the identifier cache. Entries in the beneficiary list for which there is no match in the identifier cache are marked as not reachable.

6.  Return the identifier list to the account identification administration module. It will be stored and marked with a unique identifier if it does not already have one.

The diagram below shows the architecture of the account identification service:

![Identifier Service](/payments-interoperability-layer/assets/concept-identifier-service.drawio.svg)

## Payability service

The payability service goes beyond the account identification service. It answers the question: is it possible to transfer a given amount into each beneficiary’s account? This question needs to be asked because, even in situations where a beneficiary is verified as having an account, transferring a given sum of money into that account may not be possible – for instance, because of KYC regulations, account suspension or other reasons. The payability service therefore interrogates the payment execution services deployed in the jurisdiction directly to obtain an answer to this question, whereas the account identification service interrogates directory services. Although in many jurisdictions the PES also provides the directory services, there are also independent directory services which record the DFSP which holds an account for a given identifier; and the Payments Interoperability Layer therefore distinguishes between the two types of question. The payability service works in the following way:

1.  The SPP submits a list of beneficiaries, and the amounts which are to be paid to each, to the payability API. A beneficiary list has a header which will support the following options:

    1.  Full payability check. If this option is selected, all the entries in the beneficiary list will be checked for payability. If it is not, only those entries which have not already been checked for payability will be checked.

2.  The beneficiary list can include a reference to an existing beneficiary list. If it does, then the administrative process for the payability service will retrieve the existing beneficiary list, and the entries in the beneficiary list submitted by the SPP will be treated as actions in relation to the existing list. If the beneficiary list does not contain a reference to an existing beneficiary list, then a new beneficiary list will be created and stored. The following actions are permitted:

    1.  ADD: the beneficiary in question will be added to the list.

    2.  DELETE: the beneficiary in question will be removed from the list.

3.  If there are any entries in the consolidated list for which account identification has not been performed, or if a full account identification check has been requested, then the payability service will call the account identification service to identify accounts where they exist.

4.  For all entries in the beneficiary list where a DFSP and PES have been identified, and where the PES supports a payability check, the payability service will ascertain whether or not the proposed benefit can be credited to the beneficiary’s account. Where the PES does not support a payability check, nothing can be done. Where a payability check can be performed, the process is as follows:

    1.  Divide the list of beneficiaries who have accounts with institutions capable of supporting a payability check into groups whose accounts are serviced by a given PES.

    2.  Send each list produced in this way to the appropriate PES adapter.

    3.  Wait for a response from the PES adapter(s).

    4.  When the PES adapter responds, update the entries in the beneficiary list with the response. If the response for a given account is negative (i.e. if the benefit cannot be credited to the beneficiary’s account,) then treat the beneficiary as if they did not have an account for the purposes of this benefit.

5.  Update the original beneficiary list with the results of the payability check.

    1.  If a PES does not respond, then mark all the beneficiary accounts managed by that PES as unreachable.

6.  Return the identifier list to the payability administration module. It will be stored and marked with a unique identifier if it does not already have one.

The diagram below shows the architecture of the payability service:

![Payability Service](/payments-interoperability-layer/assets/concept-payability-service.drawio.svg)

## Payment Execution Service

The payment execution service allows an SPP to request that the beneficiaries defined in a beneficiary list should be credited with the amounts defined in that list. The service supports scenarios where the list is sent directly to the payment execution service, and also scenarios where an SPP requests that a beneficiary list which has already been stored should be executed or re-executed (for instance, in the case of regular payments to a defined set of beneficiaries.)

### PES adapters

The core functionality of the payment execution service is to manage the interface between the simple payment instruction given by the SPP and the detailed instructions which execute a payment in a given payment execution system. These instructions may be very different for different PESs.

For instance:

-   Some PESs will support bulk payment requests; others will not.

-   Some PESs (for instance, Mobile Money Systems) may require that funds are moved into the MMS control account at a commercial or central bank before they can be disbursed via the internal accounts of the MMS.

-   Some PESs may offer a central entry point which allows funds to be debited from accounts at multiple participants using the same interface (a 3PPI interface); others may require that payments be made using the external interface of the participant.

-   Some jurisdictions may require that funds be moved from a Treasury Single Account (TSA) before they can be disbursed; others may allow SPPs to hold accounts directly at central or commercial banks and to disburse funds from them.

All of these differences are managed by different Payment Execution Service adapters. A PES adapter consumes payment instructions in a standard format, and converts them into a form which can be understood by the target PES. The principle is that difference between PESs should be encapsulated at the lowest possible level, so that standard operations such as the quality control and decomposition of payment lists can be performed in a single standard way.

It is, of course, possible that a given jurisdiction might only have a single PES. For instance, in Tanzania all account-holding institutions will be connected to the Tanzania Instant Payments System (TIPS). In this case, the architecture of the payment execution service continues to be the same, but there will be a reduced number of payment adapters, one for each of the external interfaces of the banks which may hold SPP debit accounts. If TIPS subsequently implements a 3PPI interface, then there will only be a single adapter, which will allow SPPs to debit accounts at any account-holding institution using the same interface. All of this will, however, be managed within the Payments Interoperability Layer. Individual SPPs will not need to make any changes to their applications to reflect this change.

### External approvals

In some jurisdictions, SPPs will need to obtain external approval, for instance from the Finance Ministry or the Treasury, before they are allowed to execute a payment. The Payments Interoperability Layer supports this requirement via a separate adapter, which can be configured to interact with the approval process implemented in a given jurisdiction. The particular form of the approval process – for instance, the implementation of maker/checker and escalation processes – is defined as outside the scope of the Payments Interoperability Layer, although implementers in a given jurisdiction may need to build parts of this process as part of their Payments Interoperability Layer implementation.

### Unbanked services

An important characteristic of a Payments Interoperability Layer is that it should be able to make payments to all the beneficiaries of a given SPP, whether or not the beneficiary has a reachable account into which the benefit can be paid. Almost all Payments Interoperability Layers will therefore require some means of making payments to beneficiaries who do not possess reachable accounts. These methods may be very different from each other, depending on the coverage of the PESs in the jurisdiction. In some jurisdictions, it may be necessary for the government to deliver cash; in others, vouchers may be used; some jurisdictions may wish to use PES-specific vouchers, whereas others may want to issue vouchers which may be redeemed via any PES, and so on. Because of the variety of solutions which may be required, the Payments Interoperability Layer will support one or more adapters to manage payments to unbanked participants. In a pattern analogous to that used for the PES adapters, an unbanked adapter will manage disbursements to unbanked beneficiaries and, if required, mange the redemption of those disbursements: for instance, by moving funds to a particular PES to support its disbursement of cash to the holder of a voucher.

The payment execution service works in the following way:

1.  The SPP submits a list of beneficiaries to the account identification API. A beneficiary list has a header which will support the following options:

    1.  Full payability check. If this option is selected, all the entries in the beneficiary list will be checked for payability. If it is not, only those entries which have not already been checked for payability will be checked.

    2.  Execution date/time. The list can contain a required execution time. This is the date and time at which beneficiaries should receive the benefits defined by the list. Some PESs will support payment which is completed at a target time; others will only support initiation of the payment process at a specified time. Individual PES adapters will manage this distinction.

1.  The beneficiary list can include a reference to an existing beneficiary list. If it does, then the administrative process for the payment execution service will retrieve the existing beneficiary list, and the entries in the beneficiary list submitted by the SPP will be treated as actions in relation to the existing list. If the beneficiary list does not contain a reference to an existing beneficiary list, then a new beneficiary list will be created and stored. The following actions are permitted:

    1.  ADD: the beneficiary in question will be added to the list.

    2.  DELETE: the beneficiary in question will be removed from the list.

2.  If there are any entries in the consolidated list for which the payability check has not been performed, or if a full payability check has been requested, then the payment execution service will call the payability service to check payability of the entries in the list.

3.  If external approval for execution of the payments associated with the beneficiary list is required and an external approval interface is available, then call the external approval interface and await a response.

    1.  If approval is withheld, then record this fact and any reasons associated with it, and return the beneficiary list to the payment execution service’s administration module.

4.  Divide the entries in the beneficiary list for which a reachable bank account has been found from those where no reachable bank account exists.

5.  For each beneficiary where no reachable bank account exists, send the information to the unbanked payment execution service appropriate to the jurisdiction.

6.  Segment the other beneficiaries by PES and send each segmented list to the appropriate PES adapter. Await the adapter response. This may be a long-running process, since execution dates for a beneficiary list may be some time in the future; the design will take account of this by using an asynchronous pattern for communication with the PES adapters. When the adapter responds, update the beneficiary list with the results of the payment.

7.  When all adapters have responded, return the beneficiary list to the payment execution administration module. It will be stored and marked with a unique identifier if it does not already have one.

The diagram below shows the architecture of the payment execution service:

![Payment Execution Service](/payments-interoperability-layer/assets/concept-payment-execution-service.drawio.svg)

## Inbound payment service

As well as making disbursements, SPPs may need to collect information about payments which are made to them by individuals or organisations: for instance, school fees to a subsidised national educational system, or subscriptions to a health or dental plan. In these cases, the funds will already have been transferred to a government account; the function of the Payments Interoperability Layer is to record these payments in a form which will enable the SPP to record that a payment has been made and to credit the payment to the customer’s account with the SPP.

The inbound payment service also makes use of adapters; but in this case the adapters allow the Payments Interoperability Layer to receive information about credits to one or more accounts in an account-holding institution. Each account-holding institution is likely to have its own way of providing this information: some institutions may require a requester to make regular specific requests for information, while others may provide a publication/subscription interface which allows a requester to obtain notifications whenever there is a change to the underlying account. The adapter shields this differentiation from the Payments Interoperability Layer. The agreements between the Payments Interoperability Layer and individual account-holding institutions which give the Payments Interoperability Layer permission to be notified of changes in an underlying account (these are normally known as AISP agreements) are outside the scope of the Payments Interoperability Layer and are assumed to have been concluded as part of Payments Interoperability Layer set-up.

The inbound payment service has the following resources.

### Register inbound account

This interface enables an SPP to register an account which it wishes to monitor for credits. This will be the account into which the SPP directs subscribers to pay their deposits. The SPP will give an account number, and select the identifier of an account-holding institution. The inbound payment service will check that the account can reach the account specified, and that the Payments Interoperability Layer has permission for an AISP relationship with the account. If these checks succeed, then the relationship will be set up and the information passed to an account listener. The account listener will route the request to the appropriate account information service adapter.

### Listen for account movements

The account listener manages the interactions with different account information service adapters. When an account information service adapter receives information about an incoming funds transfer, it will return the information to the account listener.

When information on deposits is returned to the account listener, it will check the debtor party in the deposit to see if the account information returned should have a synonym substituted for consumption by the SPP. This feature manages the situation where, for instance, the bank’s records identify the customer by their account number, but the SPP identifies them by National ID number. If a synonym is defined for the customer, then it is added to the customer’s record.

The account movement is then stored in the inbound payment service’s persistence store.

### Callbacks 

The inbound payment service allows an SPP to define a callback for a particular credit account. If a callback is defined for a credit account and a credit to that account is recorded, then the information related to that credit will be returned to the URL specified in the callback in a standard format. This feature allows SPPs to get real-time updates of payments into their accounts.

### Payment queries

The inbound payment service allows an SPP to make a manual query for information relating to transfers into a specific account. Transfers may be requested by time period, or an SPP may request all transfers received since the last query. The inbound payment service maintains a record of the payments which have been transferred to the requesting SPP.

The diagram below shows the architecture of the inbound payments service:

![Inbound Payment Service](/payments-interoperability-layer/assets/concept-inbound-payment-service.drawio.svg)
