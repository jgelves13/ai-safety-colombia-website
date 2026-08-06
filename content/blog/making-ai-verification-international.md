---
title: "Internationalising AI Verification"
description: "Verifying properties about AI systems will be essential for international AI governance and secure AI adoption. SASH, Oxford Martin AI Governance Initiative, and a team of researchers are launching an international collaboration to build the tools that make AI verifiable across borders."
date: "2026-06-30T08:00:00.000Z"
dateLabel: "June 2026"
topic: "AI Security"
---
This month, Anthropic has [advocated for](https://www.anthropic.com/institute/recursive-self-improvement#:~:text=We%20believe%20it,a%20verifiable%20manner.) developing the “option to slow or temporarily pause frontier AI development” and OpenAI has [expressed support](https://openai.com/index/built-to-benefit-everyone-our-plan/#:~:text=One%20goal%20of%20such%20an%20organization%20should%20be%20to%20make%20it%20possible%20for%20the%20world%20to%20take%20coordinated%20action%2C%20including%20slowing%20frontier%20development%20when%20needed%2C%20so%20societal%20resilience%2C%20safety%2C%20and%20alignment%20can%20keep%20pace.) for an international body whose goals should include enabling collective action on AI, “including slowing frontier development.” Both have expressed interest in tools that would let them make reliable commitments to each other and to governments about when and how they are training new models and what safety commitments they are adhering to.

These tools, **AI verification mechanisms,** could dramatically expand the space of possible AI governance interventions and aren’t just for pausing AI development. They could also enable adoption of AI in sensitive industries by providing assurances about systems’ attributes, behaviour, and testing. For countries seeking to host foreign-made frontier AI, these mechanisms can enable greater trust in datacenters operated by foreign companies. Most ambitiously, verification mechanisms could play a role in international agreements on how AI is used or developed. While theoretical ideas and some exploratory prototypes exist, much more work remains to be done, particularly to ensure that these tools are trusted globally.

To help address this we are launching an international, open-source effort to prototype and stress-test some of these tools. Early partners include the Oxford Martin AI Governance Initiative and Future of Life Institute. Our first project asks a concrete question: can we build a system that helps distinguish model inference from training using confidential network loggers?

We’ve developed an initial prototype showing how this could be done and are now publishing this work for policymakers and researchers for feedback on our second version.

1. **Inform decisionmakers:** Give policymakers and industry a concrete view of what these tools can already do, so they can act on it.
2. **Find what's tractable:** Surface specific engineering and cybersecurity problems in existing research ideas by building working prototypes.
3. **Build trust globally:** Involve stakeholders worldwide, so these tools are trusted by actors everywhere frontier AI is deployed.

## The Case for AI Verification Mechanisms

Verification mechanisms are tools and processes which can determine whether another party is complying with an agreement about the development or use of AI systems.[2](#note-688e5e8d97ab) Similar to how metal detectors let you check whether a bag contains a knife without having to expose everything in the bag, many of these mechanisms can establish compliance in a privacy-preserving way. For example, installing power consumption monitors outside a datacenter can reveal information about datacenter workloads without having to directly inspect the hardware, algorithms, or personnel involved.

AI systems are becoming more autonomous and taking on more consequential tasks across regulated industries and governments. As that happens, working verification mechanisms will matter for two reasons: they give AI developers cover to prioritise safe development practices over release schedules, and they enable trustworthy adoption of AI in high-stakes settings.

Verification can help with a range of policy goals – not just slowing down AI development. Hardware-based mechanisms can help customers verify whether they’re getting the [contractually required model](https://fallrisk.ai/), incentivise foreign companies to provide reliable access to frontier models in country by reducing [risks to model weight security](https://cloud.google.com/blog/products/ai-machine-learning/run-gemini-and-ai-on-prem-with-google-distributed-cloud), and allow policymakers to determine whether a model has [undergone certain evaluations](https://arxiv.org/abs/2506.23706).

But disclosing the information needed to verify compliance is itself a challenge. The most advanced AI systems rely on intellectual property worth hundreds of billions of dollars, so verification mechanisms need to find ways to disclose information required for determining compliance without exposing sensitive IP. Worse yet, it must do so while also protecting users’ data, deployment environments, and other data. This matters most in high stakes contexts, such as international agreements or critical industries, where disclosing this IP can have serious national security implications as well as commercial ones.

But we will need to do better than a metal detector. Rather than a single checkpoint, robust verification will require multiple interlocking mechanisms — each revealing only what’s needed, accepted because together they make trust possible where it otherwise wouldn’t be

## Verifying Inference as a First Step

AI verification will need visible wins to be seen as viable in the eyes of policymakers and companies. We are advancing a potential win: distinguishing inference from training.

**Inference verification** mechanisms categorise datacenter workloads into training, inference, or fine-tuning without exposing the underlying prompts or weights. Since slowing down AI development shouldn’t interfere with people’s ability to get value out of existing models, inference verification would allow companies to continue serving existing models while demonstrating that they are not developing new ones, by reference to the workloads being run in their datacenters.

This is a promising early avenue for AI verification because the **traffic generated during inference is structurally different to training**. Put crudely: inference traffic involves many small bursts of activity on a relatively small number of GPUs while training large models involves sustained, cyclical activity on a relatively large number of GPUs. Reliably detecting these patterns will be a first step towards reducing the chances a company or government can train a model during a coordinated slowdown.

Another justification for this as a first step in AI verification is that, demand for this work is growing. Notably, the Anthropic Institute [recently suggested](https://www.anthropic.com/institute/recursive-self-improvement#:~:text=A%20meaningful%20slowdown,and%20who%20adjudicates.) that internationally recognised verification mechanisms will be required if we want to slow the pace of AI development.

Currently, nearly all AI verification mechanism research is conducted in North America and Western Europe, primarily in private research institutions. However, if these tools are to be used in high stakes international business environments or international agreements related to AI development, they need to be developed in a way that inspires trust worldwide. For US companies seeking to embed their models into products and infrastructure in other countries, they need to be able to prove that they’re serving the model they claim; for governments in middle powers verification enables visibility into whether foreign datacenters operating in their country are compliant with local AI regulations. In both these cases, opaque tools developed in a small portion of the world are insufficient for providing this trust.

## Our Approach: Making AI Verification R&D International

We’re seeking to change this by starting an international initiative focused on prototyping verification tools. An international effort can speed up verification by:

1. **Creating independent experts who can validate verification claims:** A verification regime is only as valuable as the trust placed in its claims. Rather than relying on a foreign adversary’s claims or allowing direct inspection of your system, creating a wider base of experts who can assess the security of a verification system will be important for establishing confidence in a system.
2. **Enabling the creation of diverse supply chains for verification tools:** Some measures, such as the [TEEs](https://learn.microsoft.com/en-us/azure/confidential-computing/trusted-execution-environment) built into advanced chips, depend on a handful of suppliers concentrated in a few countries. A party forced to rely on an adversary’s components has little reason to trust them due to [supply-chain vulnerabilities](https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-and-machine-learning-supply-chain-risks-and-mitigations). Building verification tools across a wider range of jurisdictions reduces these single points of failure.
3. **Stress-testing mechanisms against a wider range of attacks:** These tools will need to be built to a high degree of security if they are to be used in high-stakes domains. [Security through transparency](https://arxiv.org/abs/0801.3924) has been one of the most reliable pathways for discovering vulnerabilities in software and could apply to the verification domain too.

Our current group of researchers spans Singapore, the US, the UK, Hungary, Canada and Germany, but we’re seeking to build a broader coalition of researchers with backgrounds in AI hardware, cybersecurity, electrical engineering, arms control policy, and semiconductor supply chains.

Our approach centers around **building open-source implementations of prototypes.** By doing so we can uncover unforeseen implementation challenges and increase the trustworthiness of these mechanisms. Since building AI verification mechanisms will ultimately be an [iterative process](https://amododesign.com/notes/2026-06-08-verification-is-a-ladder/), we want to build in a way which encourages many groups with different approaches to take swings at building new versions of the tools we develop.

This approach has been [used for sensitive technologies before](https://ethw.org/Milestones:Rijndael_and_the_Advanced_Encryption_Standard_(AES),_1995_-_1998). The Advanced Encryption Standard, which is now used to protect everything from web traffic to classified government data, was created via a similar public, open-source competition to earn trust. We think a similar open process can yield secure results for AI verification as well.

## Confidential Network Loggers for Inference Verification

![Architecture diagram](/sash/blog/2cdddceb.png)

**Our first project is an international collaboration to build a small-scale inference verification system using confidential network loggers (CNLs),** also referred to as network taps. CNLs are specialised traffic analysis systems which [split and copy network traffic](https://amododesign.com/notes/2026-03-20-network-taps-first-test/) coming out of a cable. Since traffic from AI datacenters is transmitted to their destination via optical cables, these cables are one intervention point that allows you to observe the datacenter’s activity without seeing sensitive data inside (e.g., pod structure, model weights) or outside (e.g., user prompts, model outputs).

CNLs may be a valuable component for inference verification for a number of reasons.

1. **Supply chain robustness.** Unlike many components in the AI supply chain, CNLs can be produced in many countries. Most AI chips are designed in either the US or China and assembled in Taiwan, which may introduce concerns that they have been tampered with during construction. CNLs, by contrast, have a much wider supply chain.
2. **Retrofittable.** Unlike on-chip mechanisms for verifying AI workloads, which require suitable chips to be installed in the datacenter, CNLs can be installed on most datacenters. This makes them a more flexible intervention point.
3. **Relative simplicity.** CNLs come in different varieties, but generally are fairly simple and transparent tools. This makes them easy to [inspect for inserted vulnerabilities](https://ui.adsabs.harvard.edu/abs/2008IDTC...25..590H/abstract) and easy to swap out if one side believes that device has been compromised.

![Physical prototype shown at DC AI Security Forum](/sash/blog/33d51699.jpg)

However, this prototype security has a number of limitations. Most glaringly, there is no means to monitor the security of the recomputation cluster. Additionally, it uses a [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/) as the CNL, locking us into Broadcom and Arm’s supply chains. While this isn’t meant to be a production system, more prototypes will be needed to identify the remaining security challenges.

In our next prototype a [FPGA](https://www.ibm.com/think/topics/field-programmable-gate-arrays), a type of reprogrammable chip often used in military equipment, will sit between the host’s cluster and their output gateway. As traffic passes through, the FPGA issues cryptographic certificates attesting to the encrypted traffic it has seen, and a random sample is sent to a recomputation cluster, which has been mutually inspected by both parties. Inside the recomputation cluster, another copy of the model inside the datacenter is securely housed and can be used to recompute the received inputs. If the outputs don’t match, then an alarm is triggered. The trick is that the verifier can only see *encrypted hashes* of the inputs and outputs, meaning they can tell if the inputs and outputs match – but without reading them directly.

Future versions will include incorporating zero knowledge proofs into the recomputation method, eliminating a wider range of side channels vulnerabilities, and scaling the design to handle production traffic volumes. Each of these steps will be important for climbing the ladder to production scale verification mechanisms.

Verification mechanisms will only be trusted if they are built in the open, tested by many hands, and improved by people who will need to trust them – not just the people who invented them.

In the next month we will release an additional CNL prototype and the work that follows it for public inspection. We are looking for collaborators — engineers, cybersecurity researchers, and institutions outside the handful of countries where this work is concentrated today — to scrutinise what we build, find where it fails, and take their own swings at the next version.

We're hiring for a Technical Lead and Research Engineer to support this work. See our Careers page for openings.

AI verification in our usage is drawn from the international security tradition. It differs from (i) formal verification of software, (ii) the application of formal methods to AI hardware, and (iii) the verification of formal properties of AI algorithms or models to shape their behaviour.

We're hiring for a Technical Lead and Research Engineer to support this work. See our Careers page for openings.

AI verification in our usage is drawn from the international security tradition. It differs from (i) formal verification of software, (ii) the application of formal methods to AI hardware, and (iii) the verification of formal properties of AI algorithms or models to shape their behaviour.

## Singapore: A Bridge for Global AI

A SASH essay on Singapore's role as a bridge for international AI governance work.
