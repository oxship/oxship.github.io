---
layout: post
title: "A €5,000 SQL injection in a SOAP integration"
description: "An unauthenticated SQL injection, two program submissions, and a server that turned out to be unused."
author: oxship
date: 2026-09-27
severity: "Exceptional (10.0)"
severity_label: "Program rating"
tags: [sql-injection, soap, disclosure, asset-lifecycle]
published: true
---

On May 19, 2026, I reported an unauthenticated SQL injection in an externally reachable SOAP integration. Four months later, the main-program report closed with an **Exceptional (10.0)** rating and a **€5,000 total bounty**, shared with my collaborator, almirkrass.

The final remediation was to turn off the server. The company explained that it was no longer used.

Between discovery and resolution, the report moved between programs, a request appeared to stop working, and another operation on the same server continued to expose the problem. The case became as much about tracking the affected service through that process as it was about the original injection.

## At a glance

<div class="table-scroll" markdown="1" role="region" aria-label="Case summary" tabindex="0">

| Item | Outcome |
| --- | --- |
| Vulnerability | Unauthenticated SQL injection in SOAP integration services |
| Database technology | Microsoft SQL Server |
| First report | May 19, 2026 |
| Main-program submission | June 3, 2026, in collaboration with almirkrass |
| Final program rating | Exceptional, 10.0 |
| Total bounty | €5,000 across both collaborators |
| Resolution | September 24, 2026; server switched off, according to the company |

</div>

## Reconnaissance: from an indexed IP to SOAP services

I started with a hostname search in **Shodan**, scoped to the company's domain. That led me to an indexed IP address associated with the organization.

From there, I used **shortscan** for IIS short-name enumeration. I followed that with **ffuf** and the **`iis.txt` wordlist**, looking for paths that shared a service-name prefix. This narrowed the search to the integration services that became the focus of the report.

The discovery sequence was:

<div class="table-scroll" markdown="1" role="region" aria-label="Reconnaissance overview" tabindex="0">

| Stage | Tool | Purpose |
| --- | --- | --- |
| Public indexing | Shodan | Find an IP associated with the company's hostnames |
| IIS enumeration | shortscan | Look for short-name hints on the exposed IIS surface |
| Path discovery | ffuf with `iis.txt` | Identify service paths using a prefix relevant to the target |
| Service review | SOAP request and response inspection | Understand the exposed operations and their behavior |

</div>

The company domain, IP address, and service-path prefix are redacted in this writeup. The discovery tools identified where to look; the subsequent application responses supplied the evidence for the SQL injection.

## An integration service with database access

The first finding involved an email-change operation exposed through a SOAP service. It accepted requests without credentials or a logged-in browser session.

SOAP was the transport layer: an XML envelope carried the operation and its input. The security issue appeared further down the request path, where that input influenced a database query.

Unexpected input produced Microsoft SQL Server parsing errors in the response, including an unclosed quotation-mark error. That was a useful signal, but a parsing error alone did not establish the extent of the issue.

I did not have the server-side source code. Unsafe construction of SQL statements was an inference from the responses, rather than something I confirmed by reading the implementation.

## Building evidence beyond the first error

The report described several distinct observations: database parsing failures, changes in application behavior, and retrieval of limited database metadata. Together, those supported the SQL injection finding more strongly than an isolated error message.

The important distinction was between influencing a query and proving every possible consequence of that influence.

<div class="table-scroll" markdown="1" role="region" aria-label="Evidence and limits" tabindex="0">

| Evidence in the report history | What it supported | What it did not establish |
| --- | --- | --- |
| SQL Server parsing details returned to the caller | User input was reaching SQL processing unsafely; internal error details were exposed | The amount of data an attacker could access |
| Changes in application processing after controlled input changes | Input affected database-dependent behavior | That a downstream error itself contained customer data |
| Database metadata returned or inferred from the responses | The issue went beyond a simple malformed-request error | A complete customer-database dump |
| My own newly created website account was linked to the data under investigation | A connection to data used by the main website | The identity or contents of every reachable table |

</div>

I reported limiting data collection to database metadata, a record count, and verification involving my own test account. I did not dump customer records.

The original report discussed broader risks to customer information and possible data modification. Those were impact scenarios. The evidence I am presenting here supports unauthenticated query manipulation and database metadata disclosure; it does not demonstrate arbitrary modification, deletion, or access to every category of payment data.

## Moving the report to the right program

Intigriti reproduced the original finding on May 19 and passed it to the company. The following day, the company explained that the integration did not belong to the website covered by that particular program and should be handled through the general program instead.

That created a routing question. The service lived on a separate subdomain, but my test-account check was the basis for arguing that the issue affected data associated with the main website.

On June 3, triage instructed us to resubmit. The first report was closed as **Informative** as part of that move, and later archived. That status belonged to the original submission; the main-program report continued through review.

I had reached the submission limit at the time. Almirkrass created the main-program submission and added me as a collaborator.

## A second operation kept the investigation open

The follow-up evidence concerned a product-related operation on another SOAP service on the same server. This was a different operation from the email-change operation in the original report.

That distinction matters. A request being rejected, or one route no longer behaving as before, does not show that every affected operation on the server has been addressed. It also does not establish why the original request stopped working.

During the June review, triage asked for evidence beyond a syntax error. I supplied further database metadata evidence for the product operation. On June 4, triage confirmed reproduction and passed the main report to the company. The program record listed the severity as **Exceptional (10.0)**.

That was the program's recorded rating. My original submission had proposed a separate CVSS 3.1 assessment of 9.1.

## The September retest

On September 22, the discussion resumed with the understanding that the issue had previously been solved. My retest notes showed that the product operation still exhibited the reported behavior.

The comparison was clear at the application level. A baseline request returned an empty result with a success status. Other controlled inputs led to a downstream-service exception or SQL Server parsing details, including fragments of the constructed query.

The September 24 notes also recorded that both the baseline and error responses used HTTP 200. The application-level status and response body carried the distinction. Watching the HTTP status alone would have hidden it.

The company then asked for a complete SOAP request to help reproduce the behavior. I supplied the request context alongside the baseline and observed response differences. No credentials or cookies were needed for those recorded tests.

After I also clarified the connection to the earlier submission, the company accepted the main report on September 24 and awarded the €5,000 total bounty.

## Resolution: the server was retired

Later that day, the company explained that the server was no longer used and had been turned off. The report moved to **Resolved**.

That is the documented remediation for this case. I do not have a source-code patch to describe, and the report history does not establish that all of the affected query implementations were rewritten.

The outcome highlighted a service-lifecycle problem: a server could be unnecessary to the business and still remain reachable with a database connection. Retirement removed the reported service from exposure.

## Timeline

<div class="table-scroll" markdown="1" role="region" aria-label="Report timeline" tabindex="0">

| Date | Event |
| --- | --- |
| May 19, 2026 | Original report submitted; triage reproduced it the same day. |
| May 20 | The company identified the program-routing issue; I explained the link to my main-site test account. |
| June 3 | Triage requested resubmission. Almirkrass opened the collaborative main-program report, and I supplied further evidence. |
| June 4 | Triage confirmed reproduction; the program record listed Exceptional, 10.0. |
| June 18 | The original Informative report was archived; the main report remained under review. |
| September 22 | Product-operation retest evidence showed the issue was still observable. |
| September 24 | Further reproduction details supplied; report accepted and €5,000 total bounty awarded. |
| September 24 | The company reported switching off the unused server and marked the report Resolved. |

</div>

## What I took from it

**Make the evidence easy to evaluate.** A database error is a starting point. The stronger report explains what changed, what the response establishes, and where the demonstrated impact stops. A complete request context also saves time when the reviewer is less familiar with the protocol.

**Track operations individually during retesting.** In this case, the original email-change finding and the later product-service evidence belonged to the same investigation, but they were different request paths. Keeping that distinction visible made the remediation discussion more precise.

**Keep the submission history attached to the finding.** Moving a report between programs can leave earlier reproduction work in another thread. Linking the two submissions helped restore that context after several months.

For an integration that needs to remain in service, the database defense is to bind user values through parameterized queries and restrict the application's database permissions. Those are established recommendations in the [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html). Detailed database exceptions should also stay out of public responses, although hiding them alone would not fix unsafe query construction.

For this server, the company chose retirement. Keeping an accurate inventory of exposed integrations—and removing them when they are no longer needed—was the operational lesson behind the final resolution.

Thanks to **almirkrass** for collaborating on the main-program submission, and to the triage team and the company for working through the report and resolving the exposure.
