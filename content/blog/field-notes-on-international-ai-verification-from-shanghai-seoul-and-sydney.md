---
title: "Field Notes on International AI Verification from Shanghai, Seoul, and Sydney"
description: "AI company employees say we should agree to pace AI development. We’ve been prototyping and socializing the required tools with policymakers and researchers internationally. Here's what we've found."
date: "2026-07-30T04:11:58.772Z"
dateLabel: "July 2026"
topic: "International Coordination"
---
## AI Company Staff Called for International Coordination. Here's What We Learned Trying to Deliver It

The open letter signed by over 1,200 AI company employees (including Anthropic CEO, Dario Amodei), [Pacing the Frontier](https://www.pacingthefrontier.com/), called for the US government to support international efforts to build tools that would allow us to restrain the pace of automated AI development. An important part of making restraint possible will be developing [AI verification mechanisms](https://aigi.ox.ac.uk/publications/verification-for-international-ai-governance/) to detect whether other AI developers are complying with agreements about how to restrain development. But, for these tools to work they will need to be trusted internationally.

Most AI verification mechanisms rely on specialised protocols – many of which still need to be invented – built into the chips or datacenters AI systems run on to monitor for compliance with agreements about how AI is developed or deployed. A challenge in developing these tools is making them robust to attempts to hide noncompliance while also not disclosing other sensitive information, like the AI developer’s IP or user data. Balancing these factors is key to establishing the trust required to deploy these systems in high-stakes settings.

We believe establishing this trust requires developing these mechanisms through an [international collaborative process](https://www.aisafety.sg/blog/making-ai-verification-international). However today only about [50 people](https://time.com/article/2026/06/23/ai-slowdown-cold-war-verification/#:~:text=The%20number%20of%20people%20working%20on%20developing%20these%20technologies%20today%20is%20tiny%E2%80%94only%20around%2050%20worldwide%2C%20according%20to%20an%20estimate%20cited%20by%20Lucid%20Computing%2C%20one%20startup%20focused%20on%20these%20verification%20tools.) are working on developing these mechanisms – most of whom are concentrated in the US and UK.

To try to build this international trust, we’ve spent the last four months assembling a global team of AI verification researchers, together with the Future of Life Institute and University of Oxford, to build an early prototype of one verification mechanism.

![CNL prototype](/sash/blog/1766235c.png)

Last month, we packed our prototype into a suitcase and traveled to China, Korea, Australia, and the US to learn about what would make these tools work internationally. We want to share what we’ve learned through conversations with university researchers, retired military officers from the US, China, and India, civil servants in middle powers, and leading AI verification researchers.

## What We’ve Learned From Taking AI Verification on the Road

Stakeholders disagreed widely about what should be done about frontier AI. However, almost everyone we spoke with saw greater visibility and assurance as desirable – regardless of their specific aims.

**Across the board policymakers were significantly more excited about approaches to verification that also unlocked opportunities to diffuse AI.** Some verification mechanisms, such as [on-chip attestable auditing](https://arxiv.org/abs/2506.23706) and [Modelwrap](https://tinfoil.sh/blog/2026-02-03-proving-model-identity), could create high assurance ways to deploy AI in sensitive industries by verifying which model is being deployed and that it meets specific evaluation standards. This desire to unlock economic opportunities held both for countries developing frontier AI, who aimed to securely diffuse their products, and for those without frontier capabilities to unlock private sector adoption that security and trust concerns currently block.

**There was clear demand for verifiable evidence on properties of AI systems deployed in defence contexts.** In discussions with defence personnel, there was consensus that proper due diligence in deploying AI in military contexts required a greater degree of certainty that the systems in their on-prem deployments were the ones they ordered, in an untampered form. For example, former military officials we spoke with from the US, China, and India agreed that being able to verify properties about the training data, external components, and fine-tuning pipelines used in military AI systems would be important for ensuring the security of the systems.
Another defense researcher, focused on autonomous weapons in the Pacific, claimed verifying model identity would be an important step in demonstrating that AI use in military settings was compliant with international humanitarian standards. This is in line with broader efforts to use verification mechanisms to secure AI systems. For example, Anthropic aims to deploy a system to detect unauthorized changes to its model weights by September.

**Countries without frontier AI development saw verification mechanisms as a way to oversee foreign-operated datacenters.** One common concern was how to reliably enforce local regulations on AI systems deployed by foreign companies. For example, one [sticking point in negotiations](https://www.abc.net.au/news/2026-07-14/copyright-law-battleground-in-australia-ai-boom/106891890) between Anthropic and the Australian government on a datacenter buildout has been whether Australian copyright laws will allow Anthropic to train new models in these datacenters without compensating Australians whose data they trained on. Certain verification mechanisms could allow regulators to detect unauthorised training runs. Civil servants in another middle power discussed how tools which enabled them to evaluate frontier AI systems without exposing proprietary datasets could help them better evaluate proprietary AI models.

**Key obstacles to adopting AI verification mechanisms included concerns about sovereignty, privacy, understanding their use cases, and political ramifications of being a first mover in this area.** Because many verification mechanisms have not been widely deployed, many stakeholders wanted high assurance of the security and effectiveness of these tools before deploying them. This makes it clear that verification mechanisms can not just be developed and marketed by a single player, but they demand both a more open R&D structure and an architecture that gives deployers a guarantee their privacy concerns are respected.

Finally, some audiences suggested that hardware-based verification mechanisms could be politically undesirable or seen as disproportionate. In particular, this stemmed from different perceptions of the severity of risks from AI systems, the level of international coordination required, and whether other tools could be used to achieve this aim.

**Many of these objections speak to the demand for more [inclusive and open development](https://www.aisafety.sg/blog/making-ai-verification-international)**[of AI verification mechanisms if they are to be trusted internationally.](https://www.aisafety.sg/blog/making-ai-verification-international)

## Bridging the gap between today’s verification use cases and international coordination

Several of the verification tools that policymakers today actually want today – confidential inference, mutually private AI evaluations, model and workload integrity assurance – could all become foundations for tools used in international agreements.

Due to how small and geographically concentrated the field of AI verification R&D is, every additional effort in this space by governments, academics, and private research institutions could create significant progress in developing the tools Pacing the Frontier calls for.

**Governments**, including ones without frontier AI companies, can contribute by:

- [Hosting pilots of verification tools](https://openmined.org/blog/secure-enclaves-for-ai-evaluation/)
- Building teams within AI safety institutes dedicated to verification mechanisms
- Funding private sector R&D
- Tying verification requirements to government AI procurement contracts

Developing these mechanisms doesn’t require world-leading AI researchers; skills in electrical engineering, security, and cryptography can all be extremely valuable. As a result, many AI middle powers have relevant expertise, talent, political positioning, and companies to play a leading role in developing these mechanisms.

**Academics and independent researchers** can directly contribute by:

- Publishing and open-sourcing research in areas such as zero-knowledge proofs, hardware security, international relations, and confidential computing
- Attending verification-focused conferences such as the [AI Security Forum, FAR.AI AViD](https://aisecurity.forum/)[, Confidential Computing Consortium Summit](https://www.far.ai/events/verification-workshop)[, and The Future Society’s Verified Conference](https://confidentialcomputing.io/event/confidential-computing-summit-2026/)
- For those looking to move into the field, joining programs like the [Frontier AI Security Residency](https://www.securefrontier.ai/), SASH’s [Frontier AI Security Training](https://www.securefast.ai/)course, and [Cambridge AI Hardware Assurance Program](https://caish.org/hardware), which offer short-term paid opportunities to work with leading experts in AI verification

**Private companies** can play a role in developing AI verification mechanisms by:

- Designing verification tools for government and industry partnerships, as [Amodo Design, Lucid Computing](https://amododesign.com/)[, and others do](https://lucidcomputing.ai/)
- Developing and testing business plans for tools like confidential inference and formal verification of model properties, helping the field identify new market demand
- Supporting or conducting pilots of different AI verification tools to demonstrate their use cases and technical maturity

Additional research agendas on AI verification are available [here, while this separate list](https://github.com/WHodgkins/AI-Verification-Papers/blob/main/README.md)[highlights organisations working in the field.](https://ai-2040.com/supplements/verification-plan/get-involved#opportunities)

- We're in search of [collaborators](https://airtable.com/appOCdheckEiIndlr/pagc2fgcy6Zo2vxar/form) from around the world.
- We're hiring for [Research Engineers](https://www.aisafety.sg/careers/research-engineer-ai-verification) and a [Technical Lead](https://www.aisafety.sg/careers/technical-lead-ai-verification).
- You can [inspect and improve our prototypes on GitHub](https://github.com/sg-ai-safety-hub/inference-verification).
- Want a short bootcamp on AI security and verification? Apply to the [Frontier AI Security Training](https://www.securefast.ai/) program.

## Where We Go from Here

While the Pacing the Frontier letter importantly calls out the need for international efforts to develop tools to manage automated AI development, there is significant work to be done to make these tools internationally trusted.

Today only about 50 people are working on verification research. We are excited to see this number grow. But verification is fundamentally about building trust amongst parties, and that trust has to be earned by building the technology as an international community — shaping the requirements jointly at the start so everyone is willing to deploy the result at the end.

SASH is contributing to this effort by expanding our prototyping efforts. Specifically, we plan to release a v2 of our [confidential network logger](https://www.aisafety.sg/blog/making-ai-verification-international) prototype based on a zero-knowledge proof system. This will enable our tool to verify higher throughput workloads and be more robust to adversarial attacks on our verification mechanism.

We will also expand our socialisation work. We plan to build multiple physical prototypes in Asia, Europe, and the US to facilitate more socialization of verification technology and recruit more international collaborators.
