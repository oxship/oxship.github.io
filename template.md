---
layout: default
title: Writeup template
description: A practical bug bounty writeup template for clear reproduction, measured impact, and responsible disclosure.
permalink: /template/
---
<section class="page-hero container"><p class="eyebrow"><span class="eyebrow-line"></span> THE FRAMEWORK</p><h1>Writeup template<span class="heading-period">.</span></h1><p>A repeatable structure for turning a verified finding into a useful public case study.</p></section>
<section class="template-intro container"><div class="template-callout"><span class="template-callout-icon" aria-hidden="true">↗</span><div><strong>Publication rule</strong><p>Confirm that the program permits public disclosure, remove sensitive data, and check that the issue is fixed or the agreed disclosure date has passed before publishing.</p></div></div><a class="template-source" href="https://github.com/oxship/oxship.github.io/blob/main/_drafts/writeup-template.md" target="_blank" rel="noopener noreferrer">Copy the Markdown starter on GitHub <span aria-hidden="true">↗</span></a></section>
<section class="content-section container"><div class="content-sidebar"><span class="sidebar-index">01 / TEMPLATE</span><span class="sidebar-rule"></span><nav class="toc" aria-label="On this page"><a href="#at-a-glance">At a glance</a><a href="#context">Context</a><a href="#reproduction">Reproduction</a><a href="#impact">Impact</a><a href="#root-cause">Root cause</a><a href="#timeline">Disclosure timeline</a><a href="#lessons">Takeaways</a></nav></div><article class="prose content-main">
<h2 id="at-a-glance">At a glance</h2>
<p>Start with the facts a reader needs to judge the issue quickly.</p>
<div class="template-field"><span>Title</span><p>[Specific weakness] in [feature] allows [demonstrated result]</p></div>
<div class="template-field"><span>Scope</span><p>Affected product, feature, and tested version or date.</p></div>
<div class="template-field"><span>Severity</span><p>Program rating, if assigned; otherwise label it as your assessment.</p></div>
<div class="template-field"><span>Status</span><p>Fixed / mitigated / accepted / pending disclosure.</p></div>

<h2 id="context">Context</h2>
<p>Describe what the feature is supposed to do and the trust boundary it relies on. State the assumptions needed to reproduce the issue, such as account roles or prerequisite access.</p>
<blockquote><p><strong>Good summary:</strong> “A member of workspace A could request a record owned by workspace B by replacing the record identifier. The server returned the full record without checking workspace membership.”</p></blockquote>
<p>The example above is illustrative. It does not describe a real target or claim a real finding.</p>

<h2 id="reproduction">Reproduction</h2>
<ol><li>List the minimum prerequisites, including account permissions.</li><li>Show the normal request or flow that establishes the expected behavior.</li><li>Show the smallest change that triggers the vulnerable behavior.</li><li>Include a redacted request and the relevant response excerpt.</li><li>Explain how you confirmed that the result was not caused by your own access.</li></ol>
<p>Use test data and redact tokens, personal information, internal hostnames, and identifiers that could expose users.</p>

<h2 id="impact">Impact and limits</h2>
<p>Explain what an attacker could do with the access and which conditions they would need. Separate what you demonstrated from what might be possible. Avoid broad claims that the evidence does not support.</p>
<ul><li><strong>Observed:</strong> the exact data or action verified in a controlled test.</li><li><strong>Potential:</strong> any broader effect, clearly labeled as an inference.</li><li><strong>Limits:</strong> permissions, rate limits, or other controls that constrain the issue.</li></ul>

<h2 id="root-cause">Root cause and fix</h2>
<p>Explain the likely broken check without assuming knowledge of private implementation. If the team shared a fix, summarize it at the level they approved for publication. A useful remediation note describes the missing authorization decision and the expected check.</p>

<h2 id="timeline">Disclosure timeline</h2>
<p>Record the report date, triage response, fix or mitigation, and permission or date of public disclosure. Use exact dates when you can verify them; omit sensitive private correspondence.</p>

<h2 id="lessons">Takeaways</h2>
<p>Close with the generalizable failure mode, the test that exposed it, and the defense that would have prevented it. Link to public advisories or vendor statements when available.</p>
<div class="template-end"><span class="eyebrow">READY TO WRITE?</span><p>Use the Markdown starter as a private draft, then publish only after a disclosure check.</p><a href="https://github.com/oxship/oxship.github.io/blob/main/_drafts/writeup-template.md" target="_blank" rel="noopener noreferrer">Open the starter file ↗</a></div>
</article></section>
