<!-- Generator: Widdershins v4.0.1 -->

<h1 id="api-specification-payments-interoperability-layer">API Specification - Payments Interoperability Layer v0.1</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

An API to perform a disbursements through various payment execution systems

License: <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License v2.0</a>

<h1 id="api-specification-payments-interoperability-layer-default">Default</h1>

## DisbursementCheck

<a id="opIdDisbursementCheck"></a>

`POST /disbursementCheck`

This request is used check the feasibility of a disbursement.

> Body parameter

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "note": "PENSION",
  "payeeList": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234"
    },
    {
      "payeeIdType": "MOBILE",
      "payeeIdValue": "8765432101"
    }
  ]
}
```

<h3 id="disbursementcheck-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DisbursementCheckRequest](#schemadisbursementcheckrequest)|true|none|
|» requestId|body|string|true|none|
|» payeeList|body|[[IndividualPayeeCheck](#schemaindividualpayeecheck)]|true|[Data model for the complex type IndividualPayeeCheck.]|
|»» IndividualPayeeCheck|body|[IndividualPayeeCheck](#schemaindividualpayeecheck)|false|Data model for the complex type IndividualPayeeCheck.|
|»»» payeeIdType|body|string|true|none|
|»»» payeeIdValue|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "requestId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "payeeResults": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "isPayable": true,
      "timestamp": "2012-04-23T18:25:43.511Z",
      "name": "string",
      "dateOfBirth": "string",
      "errors": [
        "string"
      ]
    }
  ]
}
```

<h3 id="disbursementcheck-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[DisbursementCheckResponse](#schemadisbursementcheckresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|None|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Method Not Allowed|None|
|406|[Not Acceptable](https://tools.ietf.org/html/rfc7231#section-6.5.6)|Not Acceptable|None|
|501|[Not Implemented](https://tools.ietf.org/html/rfc7231#section-6.6.2)|Not Implemented|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Service Unavailable|None|

<aside class="success">
This operation does not require authentication
</aside>

## Disbursement

<a id="opIdDisbursement"></a>

`POST /disbursement`

This request is used initiate a disbursement.

> Body parameter

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "note": "PENSION",
  "payeeList": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "amount": 100,
      "currency": "INR"
    },
    {
      "payeeIdType": "MOBILE",
      "payeeIdValue": "8765432101",
      "amount": 100,
      "currency": "INR"
    }
  ]
}
```

<h3 id="disbursement-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DisbursementRequest](#schemadisbursementrequest)|true|none|
|» disbursementId|body|string|true|none|
|» note|body|string|false|none|
|» payeeList|body|[[IndividualPayee](#schemaindividualpayee)]|true|[Data model for the complex type IndividualPayee.]|
|»» IndividualPayee|body|[IndividualPayee](#schemaindividualpayee)|false|Data model for the complex type IndividualPayee.|
|»»» payeeIdType|body|string|true|The type of payee identifier.|
|»»» payeeIdValue|body|string|true|The value of the payee identifier.|
|»»» amount|body|string|true|The API data type Amount is a JSON String in a canonical format that is restricted by a regular expression for interoperability reasons. This pattern does not allow any trailing zeroes at all, but allows an amount without a minor currency unit. It also only allows four digits in the minor currency unit; a negative value is not allowed. Using more than 18 digits in the major currency unit is not allowed.|
|»»» currency|body|string|true|ISO 4217 alphabetical currency code of the amount.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|»»» currency|AED|
|»»» currency|AFN|
|»»» currency|ALL|
|»»» currency|AMD|
|»»» currency|ANG|
|»»» currency|AOA|
|»»» currency|ARS|
|»»» currency|AUD|
|»»» currency|AWG|
|»»» currency|AZN|
|»»» currency|BAM|
|»»» currency|BBD|
|»»» currency|BDT|
|»»» currency|BGN|
|»»» currency|BHD|
|»»» currency|BIF|
|»»» currency|BMD|
|»»» currency|BND|
|»»» currency|BOB|
|»»» currency|BRL|
|»»» currency|BSD|
|»»» currency|BTN|
|»»» currency|BWP|
|»»» currency|BYN|
|»»» currency|BZD|
|»»» currency|CAD|
|»»» currency|CDF|
|»»» currency|CHF|
|»»» currency|CLP|
|»»» currency|CNY|
|»»» currency|COP|
|»»» currency|CRC|
|»»» currency|CUC|
|»»» currency|CUP|
|»»» currency|CVE|
|»»» currency|CZK|
|»»» currency|DJF|
|»»» currency|DKK|
|»»» currency|DOP|
|»»» currency|DZD|
|»»» currency|EGP|
|»»» currency|ERN|
|»»» currency|ETB|
|»»» currency|EUR|
|»»» currency|FJD|
|»»» currency|FKP|
|»»» currency|GBP|
|»»» currency|GEL|
|»»» currency|GGP|
|»»» currency|GHS|
|»»» currency|GIP|
|»»» currency|GMD|
|»»» currency|GNF|
|»»» currency|GTQ|
|»»» currency|GYD|
|»»» currency|HKD|
|»»» currency|HNL|
|»»» currency|HRK|
|»»» currency|HTG|
|»»» currency|HUF|
|»»» currency|IDR|
|»»» currency|ILS|
|»»» currency|IMP|
|»»» currency|INR|
|»»» currency|IQD|
|»»» currency|IRR|
|»»» currency|ISK|
|»»» currency|JEP|
|»»» currency|JMD|
|»»» currency|JOD|
|»»» currency|JPY|
|»»» currency|KES|
|»»» currency|KGS|
|»»» currency|KHR|
|»»» currency|KMF|
|»»» currency|KPW|
|»»» currency|KRW|
|»»» currency|KWD|
|»»» currency|KYD|
|»»» currency|KZT|
|»»» currency|LAK|
|»»» currency|LBP|
|»»» currency|LKR|
|»»» currency|LRD|
|»»» currency|LSL|
|»»» currency|LYD|
|»»» currency|MAD|
|»»» currency|MDL|
|»»» currency|MGA|
|»»» currency|MKD|
|»»» currency|MMK|
|»»» currency|MNT|
|»»» currency|MOP|
|»»» currency|MRO|
|»»» currency|MUR|
|»»» currency|MVR|
|»»» currency|MWK|
|»»» currency|MXN|
|»»» currency|MYR|
|»»» currency|MZN|
|»»» currency|NAD|
|»»» currency|NGN|
|»»» currency|NIO|
|»»» currency|NOK|
|»»» currency|NPR|
|»»» currency|NZD|
|»»» currency|OMR|
|»»» currency|PAB|
|»»» currency|PEN|
|»»» currency|PGK|
|»»» currency|PHP|
|»»» currency|PKR|
|»»» currency|PLN|
|»»» currency|PYG|
|»»» currency|QAR|
|»»» currency|RON|
|»»» currency|RSD|
|»»» currency|RUB|
|»»» currency|RWF|
|»»» currency|SAR|
|»»» currency|SBD|
|»»» currency|SCR|
|»»» currency|SDG|
|»»» currency|SEK|
|»»» currency|SGD|
|»»» currency|SHP|
|»»» currency|SLL|
|»»» currency|SOS|
|»»» currency|SPL|
|»»» currency|SRD|
|»»» currency|STD|
|»»» currency|SVC|
|»»» currency|SYP|
|»»» currency|SZL|
|»»» currency|THB|
|»»» currency|TJS|
|»»» currency|TMT|
|»»» currency|TND|
|»»» currency|TOP|
|»»» currency|TRY|
|»»» currency|TTD|
|»»» currency|TVD|
|»»» currency|TWD|
|»»» currency|TZS|
|»»» currency|UAH|
|»»» currency|UGX|
|»»» currency|USD|
|»»» currency|UYU|
|»»» currency|UZS|
|»»» currency|VEF|
|»»» currency|VND|
|»»» currency|VUV|
|»»» currency|WST|
|»»» currency|XAF|
|»»» currency|XCD|
|»»» currency|XDR|
|»»» currency|XOF|
|»»» currency|XPF|
|»»» currency|XTS|
|»»» currency|XXX|
|»»» currency|YER|
|»»» currency|ZAR|
|»»» currency|ZMW|
|»»» currency|ZWD|

> Example responses

> 200 Response

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "payeeResults": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "amount": "100",
      "currency": "INR",
      "isSuccess": true,
      "timestamp": "2012-04-23T18:25:43.511Z",
      "status": "RECEIVED",
      "amountDebited": "100",
      "amountCredited": "100",
      "errors": [
        "string"
      ]
    }
  ]
}
```

<h3 id="disbursement-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[DisbursementResponse](#schemadisbursementresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|None|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Method Not Allowed|None|
|406|[Not Acceptable](https://tools.ietf.org/html/rfc7231#section-6.5.6)|Not Acceptable|None|
|501|[Not Implemented](https://tools.ietf.org/html/rfc7231#section-6.6.2)|Not Implemented|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Service Unavailable|None|

<aside class="success">
This operation does not require authentication
</aside>

## GetDisbursement

<a id="opIdGetDisbursement"></a>

`GET /disbursement/{disbursementId}`

This request is used get the status of a disbursement.

<h3 id="getdisbursement-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|disbursementId|path|string|true|disbursementId|

> Example responses

> 200 Response

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "payeeResults": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "amount": "100",
      "currency": "INR",
      "isSuccess": true,
      "timestamp": "2012-04-23T18:25:43.511Z",
      "status": "RECEIVED",
      "amountDebited": "100",
      "amountCredited": "100",
      "errors": [
        "string"
      ]
    }
  ]
}
```

<h3 id="getdisbursement-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful operation|[DisbursementResponse](#schemadisbursementresponse)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|None|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Method Not Allowed|None|
|406|[Not Acceptable](https://tools.ietf.org/html/rfc7231#section-6.5.6)|Not Acceptable|None|
|501|[Not Implemented](https://tools.ietf.org/html/rfc7231#section-6.6.2)|Not Implemented|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Service Unavailable|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="api-specification-payments-interoperability-layer-health">health</h1>

## Health check endpoint

<a id="opIdHealthGet"></a>

`GET /health`

The HTTP request GET /health is used to return the current status of the API.

<h3 id="health-check-endpoint-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|403|[Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3)|Forbidden|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not Found|None|
|405|[Method Not Allowed](https://tools.ietf.org/html/rfc7231#section-6.5.5)|Method Not Allowed|None|
|406|[Not Acceptable](https://tools.ietf.org/html/rfc7231#section-6.5.6)|Not Acceptable|None|
|501|[Not Implemented](https://tools.ietf.org/html/rfc7231#section-6.6.2)|Not Implemented|None|
|503|[Service Unavailable](https://tools.ietf.org/html/rfc7231#section-6.6.4)|Service Unavailable|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_DisbursementCheckRequest">DisbursementCheckRequest</h2>
<!-- backwards compatibility -->
<a id="schemadisbursementcheckrequest"></a>
<a id="schema_DisbursementCheckRequest"></a>
<a id="tocSdisbursementcheckrequest"></a>
<a id="tocsdisbursementcheckrequest"></a>

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "note": "PENSION",
  "payeeList": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234"
    },
    {
      "payeeIdType": "MOBILE",
      "payeeIdValue": "8765432101"
    }
  ]
}

```

DisbursementCheckRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|requestId|string|true|none|none|
|payeeList|[[IndividualPayeeCheck](#schemaindividualpayeecheck)]|true|none|[Data model for the complex type IndividualPayeeCheck.]|

<h2 id="tocS_DisbursementRequest">DisbursementRequest</h2>
<!-- backwards compatibility -->
<a id="schemadisbursementrequest"></a>
<a id="schema_DisbursementRequest"></a>
<a id="tocSdisbursementrequest"></a>
<a id="tocsdisbursementrequest"></a>

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "note": "PENSION",
  "payeeList": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "amount": 100,
      "currency": "INR"
    },
    {
      "payeeIdType": "MOBILE",
      "payeeIdValue": "8765432101",
      "amount": 100,
      "currency": "INR"
    }
  ]
}

```

DisbursementRequest

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|disbursementId|string|true|none|none|
|note|string|false|none|none|
|payeeList|[[IndividualPayee](#schemaindividualpayee)]|true|none|[Data model for the complex type IndividualPayee.]|

<h2 id="tocS_DisbursementResponse">DisbursementResponse</h2>
<!-- backwards compatibility -->
<a id="schemadisbursementresponse"></a>
<a id="schema_DisbursementResponse"></a>
<a id="tocSdisbursementresponse"></a>
<a id="tocsdisbursementresponse"></a>

```json
{
  "disbursementId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "payeeResults": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "amount": "100",
      "currency": "INR",
      "isSuccess": true,
      "timestamp": "2012-04-23T18:25:43.511Z",
      "status": "RECEIVED",
      "amountDebited": "100",
      "amountCredited": "100",
      "errors": [
        "string"
      ]
    }
  ]
}

```

DisbursementResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|disbursementId|string|true|none|none|
|payeeResults|[[IndividualPayeeResult](#schemaindividualpayeeresult)]|false|none|[Data model for the complex type IndividualPayeeResult.]|

<h2 id="tocS_DisbursementCheckResponse">DisbursementCheckResponse</h2>
<!-- backwards compatibility -->
<a id="schemadisbursementcheckresponse"></a>
<a id="schema_DisbursementCheckResponse"></a>
<a id="tocSdisbursementcheckresponse"></a>
<a id="tocsdisbursementcheckresponse"></a>

```json
{
  "requestId": "f2957f7a-34c3-11ed-a261-0242ac120002",
  "payeeResults": [
    {
      "payeeIdType": "AADHAAR",
      "payeeIdValue": "5000-0000-1234",
      "isPayable": true,
      "timestamp": "2012-04-23T18:25:43.511Z",
      "name": "string",
      "dateOfBirth": "string",
      "errors": [
        "string"
      ]
    }
  ]
}

```

DisbursementCheckResponse

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|requestId|string|true|none|none|
|payeeResults|[[IndividualPayeeCheckResult](#schemaindividualpayeecheckresult)]|false|none|[Data model for the complex type IndividualPayeeResult.]|

<h2 id="tocS_IndividualPayeeCheck">IndividualPayeeCheck</h2>
<!-- backwards compatibility -->
<a id="schemaindividualpayeecheck"></a>
<a id="schema_IndividualPayeeCheck"></a>
<a id="tocSindividualpayeecheck"></a>
<a id="tocsindividualpayeecheck"></a>

```json
{
  "payeeIdType": "AADHAAR",
  "payeeIdValue": "5000-0000-1234"
}

```

IndividualPayeeCheck

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|payeeIdType|string|true|none|none|
|payeeIdValue|string|true|none|none|

<h2 id="tocS_IndividualPayee">IndividualPayee</h2>
<!-- backwards compatibility -->
<a id="schemaindividualpayee"></a>
<a id="schema_IndividualPayee"></a>
<a id="tocSindividualpayee"></a>
<a id="tocsindividualpayee"></a>

```json
{
  "payeeIdType": "AADHAAR",
  "payeeIdValue": "5000-0000-1234",
  "amount": "100",
  "currency": "INR"
}

```

IndividualPayee

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|payeeIdType|string|true|none|The type of payee identifier.|
|payeeIdValue|string|true|none|The value of the payee identifier.|
|amount|string|true|none|The API data type Amount is a JSON String in a canonical format that is restricted by a regular expression for interoperability reasons. This pattern does not allow any trailing zeroes at all, but allows an amount without a minor currency unit. It also only allows four digits in the minor currency unit; a negative value is not allowed. Using more than 18 digits in the major currency unit is not allowed.|
|currency|string|true|none|ISO 4217 alphabetical currency code of the amount.|

#### Enumerated Values

|Property|Value|
|---|---|
|currency|AED|
|currency|AFN|
|currency|ALL|
|currency|AMD|
|currency|ANG|
|currency|AOA|
|currency|ARS|
|currency|AUD|
|currency|AWG|
|currency|AZN|
|currency|BAM|
|currency|BBD|
|currency|BDT|
|currency|BGN|
|currency|BHD|
|currency|BIF|
|currency|BMD|
|currency|BND|
|currency|BOB|
|currency|BRL|
|currency|BSD|
|currency|BTN|
|currency|BWP|
|currency|BYN|
|currency|BZD|
|currency|CAD|
|currency|CDF|
|currency|CHF|
|currency|CLP|
|currency|CNY|
|currency|COP|
|currency|CRC|
|currency|CUC|
|currency|CUP|
|currency|CVE|
|currency|CZK|
|currency|DJF|
|currency|DKK|
|currency|DOP|
|currency|DZD|
|currency|EGP|
|currency|ERN|
|currency|ETB|
|currency|EUR|
|currency|FJD|
|currency|FKP|
|currency|GBP|
|currency|GEL|
|currency|GGP|
|currency|GHS|
|currency|GIP|
|currency|GMD|
|currency|GNF|
|currency|GTQ|
|currency|GYD|
|currency|HKD|
|currency|HNL|
|currency|HRK|
|currency|HTG|
|currency|HUF|
|currency|IDR|
|currency|ILS|
|currency|IMP|
|currency|INR|
|currency|IQD|
|currency|IRR|
|currency|ISK|
|currency|JEP|
|currency|JMD|
|currency|JOD|
|currency|JPY|
|currency|KES|
|currency|KGS|
|currency|KHR|
|currency|KMF|
|currency|KPW|
|currency|KRW|
|currency|KWD|
|currency|KYD|
|currency|KZT|
|currency|LAK|
|currency|LBP|
|currency|LKR|
|currency|LRD|
|currency|LSL|
|currency|LYD|
|currency|MAD|
|currency|MDL|
|currency|MGA|
|currency|MKD|
|currency|MMK|
|currency|MNT|
|currency|MOP|
|currency|MRO|
|currency|MUR|
|currency|MVR|
|currency|MWK|
|currency|MXN|
|currency|MYR|
|currency|MZN|
|currency|NAD|
|currency|NGN|
|currency|NIO|
|currency|NOK|
|currency|NPR|
|currency|NZD|
|currency|OMR|
|currency|PAB|
|currency|PEN|
|currency|PGK|
|currency|PHP|
|currency|PKR|
|currency|PLN|
|currency|PYG|
|currency|QAR|
|currency|RON|
|currency|RSD|
|currency|RUB|
|currency|RWF|
|currency|SAR|
|currency|SBD|
|currency|SCR|
|currency|SDG|
|currency|SEK|
|currency|SGD|
|currency|SHP|
|currency|SLL|
|currency|SOS|
|currency|SPL|
|currency|SRD|
|currency|STD|
|currency|SVC|
|currency|SYP|
|currency|SZL|
|currency|THB|
|currency|TJS|
|currency|TMT|
|currency|TND|
|currency|TOP|
|currency|TRY|
|currency|TTD|
|currency|TVD|
|currency|TWD|
|currency|TZS|
|currency|UAH|
|currency|UGX|
|currency|USD|
|currency|UYU|
|currency|UZS|
|currency|VEF|
|currency|VND|
|currency|VUV|
|currency|WST|
|currency|XAF|
|currency|XCD|
|currency|XDR|
|currency|XOF|
|currency|XPF|
|currency|XTS|
|currency|XXX|
|currency|YER|
|currency|ZAR|
|currency|ZMW|
|currency|ZWD|

<h2 id="tocS_IndividualPayeeResult">IndividualPayeeResult</h2>
<!-- backwards compatibility -->
<a id="schemaindividualpayeeresult"></a>
<a id="schema_IndividualPayeeResult"></a>
<a id="tocSindividualpayeeresult"></a>
<a id="tocsindividualpayeeresult"></a>

```json
{
  "payeeIdType": "AADHAAR",
  "payeeIdValue": "5000-0000-1234",
  "amount": "100",
  "currency": "INR",
  "isSuccess": true,
  "timestamp": "2012-04-23T18:25:43.511Z",
  "status": "RECEIVED",
  "amountDebited": "100",
  "amountCredited": "100",
  "errors": [
    "string"
  ]
}

```

IndividualPayeeResult

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[IndividualPayee](#schemaindividualpayee)|false|none|Data model for the complex type IndividualPayee.|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» isSuccess|boolean|false|none|This field indicates wheter the transfer is success or failed.|
|» timestamp|string|false|none|The timestamp of the transfer fulfilment.|
|» status|string|false|none|Status of the payment.|
|» amountDebited|string|false|none|Amount debited from payer account, the API data type Amount is a JSON String in a canonical format that is restricted by a regular expression for interoperability reasons. This pattern does not allow any trailing zeroes at all, but allows an amount without a minor currency unit. It also only allows four digits in the minor currency unit; a negative value is not allowed. Using more than 18 digits in the major currency unit is not allowed.|
|» amountCredited|string|false|none|Amount credited to payee account, the API data type Amount is a JSON String in a canonical format that is restricted by a regular expression for interoperability reasons. This pattern does not allow any trailing zeroes at all, but allows an amount without a minor currency unit. It also only allows four digits in the minor currency unit; a negative value is not allowed. Using more than 18 digits in the major currency unit is not allowed.|
|» errors|[string]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|RECEIVED|
|status|PENDING|
|status|COMPLETED|
|status|REJECTED|
|status|ABORETED|

<h2 id="tocS_IndividualPayeeCheckResult">IndividualPayeeCheckResult</h2>
<!-- backwards compatibility -->
<a id="schemaindividualpayeecheckresult"></a>
<a id="schema_IndividualPayeeCheckResult"></a>
<a id="tocSindividualpayeecheckresult"></a>
<a id="tocsindividualpayeecheckresult"></a>

```json
{
  "payeeIdType": "AADHAAR",
  "payeeIdValue": "5000-0000-1234",
  "isPayable": true,
  "timestamp": "2012-04-23T18:25:43.511Z",
  "name": "string",
  "dateOfBirth": "string",
  "errors": [
    "string"
  ]
}

```

IndividualPayeeCheckResult

### Properties

allOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[IndividualPayeeCheck](#schemaindividualpayeecheck)|false|none|Data model for the complex type IndividualPayeeCheck.|

and

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|object|false|none|none|
|» isPayable|boolean|true|none|none|
|» timestamp|string|false|none|none|
|» name|string|false|none|Name of the benificiery.|
|» dateOfBirth|string|false|none|Date of birth of the benificiery.|
|» errors|[string]|false|none|none|

