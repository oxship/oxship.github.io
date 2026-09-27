---
title: "[Weakness] in [feature] allows [demonstrated result]"
description: "One sentence describing the verified issue and its impact."
author: oxship
severity: "[Program rating or researcher assessment]"
---

> **Publication check:** Confirm public disclosure is permitted. Remove secrets, personal data, and unnecessary exploit details before moving this draft into `_posts/`.

## At a glance

| Item | Detail |
| --- | --- |
| Product / scope | [Product and affected feature] |
| Tested on | [Version or date] |
| Prerequisites | [Account role or access needed] |
| Severity | [Program rating or your labeled assessment] |
| Status | [Fixed / mitigated / accepted] |

## Summary

[Two or three sentences: expected behavior, actual behavior, and the demonstrated result.]

## Context

[Explain the feature and the trust boundary. State which accounts and test data you controlled.]

## Reproduction

1. [Create or identify test accounts and records.]
2. [Describe the expected request or flow.]
3. [Show the minimal change needed to trigger the issue.]
4. [Show the redacted response or outcome.]
5. [Explain the control test that ruled out legitimate access.]

```http
# Redacted example request; replace with your own safe evidence.
GET /example/resource/[redacted] HTTP/1.1
Host: example.invalid
Authorization: Bearer [redacted]
```

## Impact and limits

**Observed:** [Exactly what you verified.]

**Potential:** [Broader effect, labeled as inference if not tested.]

**Limits:** [Permissions, scope, rate limits, or other constraints.]

## Root cause and remediation

[Describe the missing security decision and the appropriate check. Avoid guessing at private implementation.]

## Disclosure timeline

| Date | Event |
| --- | --- |
| YYYY-MM-DD | Report submitted |
| YYYY-MM-DD | Triaged |
| YYYY-MM-DD | Fixed or mitigated |
| YYYY-MM-DD | Public disclosure approved |

## Takeaways

[One or two lessons for researchers and defenders.]
