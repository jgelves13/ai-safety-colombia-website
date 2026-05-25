# Hackathon "Qué es" Section Redesign

**Date:** 2026-05-25
**Scope:** `src/data/hackathon.json` + `src/components/HackathonContent.astro`

## Problem

The "Qué es" section has two issues:
1. The lead copy (`whatIsEs`/`whatIsEn`) is a single thin sentence describing the format with no stakes, no context, no reason to care.
2. The two mode cards (Presencial / En línea) present perks as a generic bullet list with no opening experience statement — feels like a spec sheet.

## Approved Design

### 1. Intro copy — replace `whatIsEs` / `whatIsEn` with two paragraphs (HTML string)

**ES:**
```
<p>Hoy, gran parte de la investigación en seguridad de IA se concentra en un número reducido de países. Sin embargo, estos sistemas ya están siendo desplegados en nuestra región, muchas veces con riesgos poco evaluados: sesgos no auditados, vulnerabilidades sin documentar y decisiones automatizadas sin mecanismos claros de rendición de cuentas. La capacidad de analizar, verificar y cuestionar estos sistemas desde contextos locales sigue siendo muy limitada.</p><p>El Global South AIS Hackathon es un sprint internacional de investigación de tres días diseñado para cerrar esa brecha, donde los participantes trabajan en retos definidos por expertos en seguridad y gobernanza de IA con mentoría en vivo durante todo el evento. Los equipos más destacados reciben una invitación al Apart Lab Fellowship, un programa en el que continúan desarrollando sus proyectos junto al equipo de investigación de Apart Research, con posibilidades de publicación y vinculación a organizaciones dedicadas a la seguridad de IA.</p>
```

**EN:**
```
<p>Today, most AI safety research is concentrated in a small number of countries. Yet these systems are already being deployed across our region, often with risks that remain poorly evaluated: unaudited biases, undocumented vulnerabilities, and automated decisions with no clear accountability mechanisms. The capacity to analyze, verify, and challenge these systems from local contexts remains very limited.</p><p>The Global South AIS Hackathon is a three-day international research sprint designed to close that gap, where participants work on challenges defined by AI safety and governance experts with live mentoring throughout the event. The strongest teams receive an invitation to the Apart Lab Fellowship, a program where they continue developing their projects alongside the Apart Research team, with opportunities for publication and placement at organizations dedicated to AI safety.</p>
```

### 2. Mode card experience leads — new fields in `hackathon.json`

Add two fields to `data.inPerson`:
- `experienceEs` / `experienceEn` — opening sentence for the Presencial card
- `onlineExperienceEs` / `onlineExperienceEn` — opening sentence for the En línea card

**Presencial ES:** *Un espacio dedicado en Bogotá, abierto 24 horas durante los tres días del hackathon, con trabajo en equipo presencial, mentoría en sitio y alimentación incluida.*

**Presencial EN:** *A dedicated venue in Bogotá, open 24 hours throughout the three hackathon days, with in-person teamwork, on-site mentoring, and meals included.*

**En línea ES:** *Participación remota desde cualquier lugar del Sur Global, con acceso completo a mentorías, charlas técnicas y a los canales oficiales del hackathon en Discord y Zoom.*

**En línea EN:** *Remote participation from anywhere in the Global South, with full access to mentoring, technical talks, and the hackathon's official Discord and Zoom channels.*

### 3. Component change — render experience lead above perks list

In `HackathonContent.astro`, inside each `.hk-mode` card, add a `<p class="hk-mode-exp">` immediately before the `<ul class="hk-mode-perks">`. The existing perks list stays unchanged.

Style `.hk-mode-exp`:
- `font-size: 0.9375rem`
- `line-height: 1.6`
- `color: var(--text-primary)`
- `margin-bottom: 1rem`
- No separator — the experience sentence flows naturally into the perks

## Files Changed

| File | Change |
|------|--------|
| `src/data/hackathon.json` | Update `whatIsEs`, `whatIsEn`; add `inPerson.experienceEs`, `inPerson.experienceEn`, `inPerson.onlineExperienceEs`, `inPerson.onlineExperienceEn` |
| `src/components/HackathonContent.astro` | Add `<p class="hk-mode-exp">` rendering + `.hk-mode-exp` style rule |

## Out of Scope

- No changes to perks lists, icons, card structure, or any other section of the hackathon page.
