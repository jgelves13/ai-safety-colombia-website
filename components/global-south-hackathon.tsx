import type React from "react";
import "./global-south-hackathon.css";
import data from "@/lib/global-south-hackathon.json";

type Locale = "es" | "en" | "pt";

/* UI strings: es/en from the old site's ui.ts, pt translated from them.
   Closed-state copy replaces the old "join online" CTA strings. */
const ui = {
  es: {
    altHubTitle: "Global South",
    altHeadline: "AI Safety Hackathon",
    altMeta: "19-21 de junio · Bogotá presencial u online",
    altLead:
      "Un fin de semana para construir herramientas, evaluaciones e investigación de política sobre los riesgos de IA que más importan en la región.",
    closedNote: "Las postulaciones al hackathon cerraron.",
    closedButton: "Postulaciones cerradas",
    modeClosed: "Postulaciones cerradas · 12 jun",
    altSecondaryCta: "Ver retos",
    altPanelTitle: "Destacados",
    altPanelAria: "Datos clave del hackathon",
    finalKicker: "Postulaciones cerradas",
    finalTitle: "Las postulaciones al hub presencial de Bogotá cerraron.",
    onlineFooter: "La participación en línea se gestiona directamente con Apart Research.",
    whatTitle: "¿Qué es?",
    whyTitle: "¿Por qué participar?",
    tracksTitle: "Retos",
    prizesTitle: "Premios",
    hubsTitle: "Hubs en el Sur Global",
    hubsNote:
      "Bogotá es el hub presencial que organiza AI Safety Colombia. Cualquier persona del Sur Global puede participar en línea.",
    ourHub: "Nuestro hub",
    whoTitle: "¿Quién puede participar?",
    agendaTitle: "Agenda · 3 días",
    agendaNote: "Agenda aproximada. Apart confirmará los horarios exactos con las personas inscritas.",
    judgesTitle: "Jurado",
    judgeEvalLabel: "Evalúa:",
    camaraLabel: "Perfil en la Cámara",
    judgesTba: "Jurado por confirmar. Anunciaremos a los jueces antes del evento.",
    sourceLabel: "Más sobre el impacto de Apart Research",
    deliverableLabel: "Entregable",
    speakersTitle: "Ponentes",
    attInperson: "Presencial",
    attRemote: "Remoto",
    attTbc: "Por confirmar",
    faqHeading: "Preguntas frecuentes",
    partnersTitle: "En colaboración con",
    apartDescriptor:
      "Red internacional de investigación en seguridad de IA. Organizadores del Global South AIS Hackathon.",
    supportEyebrow: "Con el apoyo de",
  },
  en: {
    altHubTitle: "Global South",
    altHeadline: "AI Safety Hackathon",
    altMeta: "June 19-21 · Bogotá in person or online",
    altLead:
      "A weekend building tools, evaluations, and policy research on the AI risks that matter most in the region.",
    closedNote: "Applications to the hackathon have closed.",
    closedButton: "Applications closed",
    modeClosed: "Applications closed · Jun 12",
    altSecondaryCta: "View challenges",
    altPanelTitle: "Highlights",
    altPanelAria: "Hackathon key facts",
    finalKicker: "Applications closed",
    finalTitle: "Applications to the in-person Bogotá hub have closed.",
    onlineFooter: "Online participation is managed directly with Apart Research.",
    whatTitle: "What it is",
    whyTitle: "Why take part",
    tracksTitle: "Challenges",
    prizesTitle: "Prizes",
    hubsTitle: "Hubs across the Global South",
    hubsNote:
      "Bogotá is the in-person hub organized by AI Safety Colombia. Anyone in the Global South can take part online.",
    ourHub: "Our hub",
    whoTitle: "Who can take part",
    agendaTitle: "Agenda · 3 days",
    agendaNote: "Approximate agenda. Apart will confirm exact times with registered participants.",
    judgesTitle: "Judges",
    judgeEvalLabel: "Evaluates:",
    camaraLabel: "Cámara profile",
    judgesTba: "Judges to be announced. We will confirm the panel before the event.",
    sourceLabel: "More on Apart Research's impact",
    deliverableLabel: "Deliverable",
    speakersTitle: "Speakers",
    attInperson: "In person",
    attRemote: "Remote",
    attTbc: "To be confirmed",
    faqHeading: "Frequently asked questions",
    partnersTitle: "In collaboration with",
    apartDescriptor:
      "International AI safety research network. Organizers of the Global South AIS Hackathon.",
    supportEyebrow: "With support from",
  },
  pt: {
    altHubTitle: "Global South",
    altHeadline: "AI Safety Hackathon",
    altMeta: "19-21 de junho · Bogotá presencial ou online",
    altLead:
      "Um fim de semana construindo ferramentas, avaliações e pesquisa de políticas sobre os riscos de IA que mais importam na região.",
    closedNote: "As inscrições para o hackathon foram encerradas.",
    closedButton: "Inscrições encerradas",
    modeClosed: "Inscrições encerradas · 12 jun",
    altSecondaryCta: "Ver desafios",
    altPanelTitle: "Destaques",
    altPanelAria: "Dados principais do hackathon",
    finalKicker: "Inscrições encerradas",
    finalTitle: "As inscrições para o hub presencial de Bogotá foram encerradas.",
    onlineFooter: "A participação online é gerenciada diretamente com a Apart Research.",
    whatTitle: "O que é?",
    whyTitle: "Por que participar?",
    tracksTitle: "Desafios",
    prizesTitle: "Prêmios",
    hubsTitle: "Hubs no Sul Global",
    hubsNote:
      "Bogotá é o hub presencial organizado pela AI Safety Colombia. Qualquer pessoa do Sul Global pode participar online.",
    ourHub: "Nosso hub",
    whoTitle: "Quem pode participar?",
    agendaTitle: "Agenda · 3 dias",
    agendaNote: "Agenda aproximada. A Apart confirmará os horários exatos com as pessoas inscritas.",
    judgesTitle: "Júri",
    judgeEvalLabel: "Avalia:",
    camaraLabel: "Perfil na Cámara",
    judgesTba: "Júri a confirmar. Anunciaremos os jurados antes do evento.",
    sourceLabel: "Mais sobre o impacto da Apart Research",
    deliverableLabel: "Entregável",
    speakersTitle: "Palestrantes",
    attInperson: "Presencial",
    attRemote: "Remoto",
    attTbc: "A confirmar",
    faqHeading: "Perguntas frequentes",
    partnersTitle: "Em colaboração com",
    apartDescriptor:
      "Rede internacional de pesquisa em segurança de IA. Organizadores do Global South AIS Hackathon.",
    supportEyebrow: "Com o apoio de",
  },
} satisfies Record<Locale, Record<string, string>>;

type Person = {
  name: string;
  affiliationEs?: string;
  affiliationEn?: string;
  attendance?: "inperson" | "remote" | "tbc";
  evalTopicEs?: string;
  evalTopicEn?: string;
  bioEs?: string;
  bioEn?: string;
  linkedin?: string;
  openreview?: string;
  camara?: string;
  photo?: string;
};

type City = { name: string; nameEs?: string; bogota?: boolean; tbd?: boolean };
type Region = {
  nameEs: string;
  nameEn: string;
  accent: string;
  teamsEs: string;
  teamsEn: string;
  prizeEs: string;
  prizeEn: string;
  cities: City[];
};

type ScheduleEvent = {
  time: string;
  timeEn: string;
  title: string;
  titleEn: string;
  note?: string;
  noteEn?: string;
};
type ScheduleDay = { day: string; dayEn: string; accent?: string; events: ScheduleEvent[] };

type DetailCard = {
  labelEs: string;
  labelEn: string;
  titleEs: string;
  titleEn: string;
  bodyEs: string;
  bodyEn: string;
  links?: Array<{ labelEs: string; labelEn: string; href: string }>;
};

type Faq = { q: string; a: string };

// Brand LinkedIn glyph, injected inline so the link carries a real logo.
const linkedinIcon =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>';

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const ic = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

// Eligibility icons, in data order: chip, code, scales, shield, cap, bulb.
const whoIcons = [
  ic('<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2"/>'),
  ic('<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16"/>'),
  ic('<path d="M12 4v16M7 20h10M5 8h14M5 8l-2.5 5a3 3 0 0 0 5 0L5 8zM19 8l-2.5 5a3 3 0 0 0 5 0L19 8z"/>'),
  ic('<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>'),
  ic('<path d="M12 4L2 9l10 5 10-5-10-5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>'),
  ic('<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2v.3h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>'),
];
const whoAccents = ["is-green", "is-coral", "is-blue", "is-yellow"];

// whyCases icons: magnifier, shield + keyhole, compass, institution columns.
const caseIcons = [
  ic('<circle cx="11" cy="11" r="7.5"/><path d="M16.8 16.8 21 21"/>'),
  ic('<path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z"/><circle cx="12" cy="10.8" r="1.7"/><path d="M12 12.5V15"/>'),
  ic('<circle cx="12" cy="12" r="9"/><path d="M16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88Z"/>'),
  ic('<path d="M3 9l9-5 9 5M5 9.5V19M19 9.5V19M3 21h18M9.5 9.5V19M14.5 9.5V19"/>'),
];

const pinIcon = ic('<path d="M12 2C8.7 2 6 4.7 6 8c0 5.3 6 14 6 14s6-8.7 6-14c0-3.3-2.7-6-6-6z"/><circle cx="12" cy="8" r="2.5"/>');
const globeIcon = ic('<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><ellipse cx="12" cy="12" rx="4.5" ry="9"/>');
const inPersonIcons = [
  ic('<path d="M3 9l9-5 9 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>'),
  ic('<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20"/><path d="M21 15V2c-3 0-5 2-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>'),
  ic('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
  ic('<path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v3M8 22h8"/>'),
  ic('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
];
const onlineIcons = [
  ic('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
  ic('<path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v3M8 22h8"/>'),
  ic('<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>'),
  ic('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
];
const deliverableIcon = ic(
  '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
);

const personAccents = ["is-green", "is-coral", "is-blue", "is-yellow"];

const html = (s: string | undefined) => ({ __html: s ?? "" });

export function GlobalSouthHackathon({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const s = ui[locale];
  // Long JSON content exists only in es/en; pt falls back to en.
  const pick = <T,>(esValue: T, enValue: T): T => (es ? esValue : enValue);

  const facts = pick(data.panelFactsEs, data.panelFactsEn) as string[];
  const cards = data.detailCards as DetailCard[];
  const whatBody = pick(data.whatIsEs, data.whatIsEn);
  const submission = pick(data.submissionEs, data.submissionEn);
  const judges = data.judges as Person[];
  const speakers = data.speakers as Person[];
  const regions = data.regions as Region[];
  const schedule = data.schedule as ScheduleDay[];
  const faqs = pick(data.faqs.es, data.faqs.en) as Faq[];

  const attLabel = (a?: Person["attendance"]) =>
    a === "inperson" ? s.attInperson : a === "remote" ? s.attRemote : a === "tbc" ? s.attTbc : "";

  const personAlt = (p: Person) =>
    `${p.name} — ${es ? p.affiliationEs || p.affiliationEn || "" : p.affiliationEn || p.affiliationEs || ""}`.replace(
      /<[^>]*>/g,
      "",
    );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
  const faqJson = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

  const personLinks = (p: Person) => (
    <>
      {p.linkedin && (
        <a
          className="hk-person-link"
          href={p.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn — ${p.name}`}
        >
          <span className="hk-li-icon" dangerouslySetInnerHTML={html(linkedinIcon)} />
          <span>LinkedIn</span>
        </a>
      )}
      {p.openreview && (
        <a
          className="hk-person-link"
          href={p.openreview}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`OpenReview — ${p.name}`}
        >
          <span>OpenReview</span>
        </a>
      )}
      {p.camara && (
        <a
          className="hk-person-link"
          href={p.camara}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${s.camaraLabel} — ${p.name}`}
        >
          <span>{s.camaraLabel}</span>
        </a>
      )}
    </>
  );

  const avatar = (p: Person) =>
    p.photo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="hk-person-av"
        src={`/globalsouth/people/${p.photo}`}
        alt={personAlt(p)}
        width={104}
        height={104}
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div className="hk-person-av" aria-hidden="true">
        {initials(p.name)}
      </div>
    );

  return (
    <>
      {/* Hero block */}
      <section className="alt-hero">
        <div className="container alt-hero-grid">
          <div className="alt-copy">
            <h1>
              <span>{s.altHubTitle}</span>
              {s.altHeadline}
            </h1>
            <p className="alt-meta">{s.altMeta}</p>
            <p className="alt-lead">{s.altLead}</p>
            <p className="alt-closed-note">{s.closedNote}</p>
            <div className="alt-actions">
              <span className="btn btn-closed" aria-disabled="true">
                {s.closedButton}
              </span>
              <a className="btn btn-secondary" href="#retos">
                {s.altSecondaryCta}
              </a>
            </div>
          </div>

          <aside className="alt-panel" aria-label={s.altPanelAria}>
            <h2>{s.altPanelTitle}</h2>
            <ul>
              {facts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Details */}
      <section className="alt-details" id="details">
        <div className="container">
          <div className="alt-card-grid">
            {cards.map((card, i) => (
              <article className="alt-card" key={i}>
                <span>{pick(card.labelEs, card.labelEn)}</span>
                <h2>{pick(card.titleEs, card.titleEn)}</h2>
                <p>{pick(card.bodyEs, card.bodyEn)}</p>
                {card.links && (
                  <div className="alt-card-links">
                    {card.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                        {pick(link.labelEs, link.labelEn)}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Intro + modes */}
      <section className="section hk-intro">
        <div className="container">
          <h2 className="section-title">{s.whatTitle}</h2>
          <div className="hk-lead" dangerouslySetInnerHTML={html(whatBody)} />

          <div className="hk-modes">
            <article className="hk-mode is-coral">
              <div className="hk-mode-top">
                <span className="hk-mode-icon" dangerouslySetInnerHTML={html(pinIcon)} />
                <span className="hk-mode-badge">
                  {pick(data.inPerson.modeInpersonLabelEs, data.inPerson.modeInpersonLabelEn)}
                </span>
              </div>
              <h3 className="hk-mode-h3">{pick(data.inPerson.bogotaHubTitleEs, data.inPerson.bogotaHubTitleEn)}</h3>
              <p className="hk-mode-tag">{pick(data.inPerson.bogotaTagEs, data.inPerson.bogotaTagEn)}</p>
              <ul className="hk-mode-perks">
                {data.inPerson.items.map((item, i) => (
                  <li className="hk-mode-perk" key={i}>
                    <span
                      className="hk-mode-perk-ic"
                      dangerouslySetInnerHTML={html(inPersonIcons[i % inPersonIcons.length])}
                    />
                    <span>{pick(item.es, item.en)}</span>
                  </li>
                ))}
              </ul>
              <p
                className="hk-mode-footer"
                dangerouslySetInnerHTML={html(pick(data.inPerson.bogotaApplyEs, data.inPerson.bogotaApplyEn))}
              />
              <span className="hk-mode-cta hk-mode-cta-closed" aria-disabled="true">
                {s.modeClosed}
              </span>
            </article>

            <article className="hk-mode is-blue">
              <div className="hk-mode-top">
                <span className="hk-mode-icon" dangerouslySetInnerHTML={html(globeIcon)} />
                <span className="hk-mode-badge">
                  {pick(data.inPerson.modeOnlineLabelEs, data.inPerson.modeOnlineLabelEn)}
                </span>
              </div>
              <h3 className="hk-mode-h3">{pick(data.inPerson.onlineTitleEs, data.inPerson.onlineTitleEn)}</h3>
              <p className="hk-mode-tag">{pick(data.inPerson.virtualTagEs, data.inPerson.virtualTagEn)}</p>
              <ul className="hk-mode-perks">
                {data.inPerson.onlineItems.map((item, i) => (
                  <li className="hk-mode-perk" key={i}>
                    <span
                      className="hk-mode-perk-ic"
                      dangerouslySetInnerHTML={html(onlineIcons[i % onlineIcons.length])}
                    />
                    <span>{pick(item.es, item.en)}</span>
                  </li>
                ))}
              </ul>
              <p className="hk-mode-footer">{s.onlineFooter}</p>
              <span className="hk-mode-cta hk-mode-cta-closed" aria-disabled="true">
                {s.modeClosed}
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* Who */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">{s.whoTitle}</h2>
          <ul className="hk-who">
            {data.eligibility.map((e, i) => (
              <li
                key={i}
                className={`hk-who-card ${whoAccents[i % whoAccents.length]}`}
                style={{ "--wi": i } as React.CSSProperties}
              >
                <span className="hk-who-ic" dangerouslySetInnerHTML={html(whoIcons[i % whoIcons.length])} />
                <span className="hk-who-label">{pick(e.es, e.en)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{s.whyTitle}</h2>
          <p className="hk-why-intro">{pick(data.whyIntroEs, data.whyIntroEn)}</p>
          <div className="hk-why-grid">
            {data.whyCases.map((c, i) => (
              <article className={`hk-case ${c.accent}`} key={i}>
                <div className="hk-case-head">
                  <span className="hk-case-ic" dangerouslySetInnerHTML={html(caseIcons[i % caseIcons.length])} />
                  <h3 className="hk-case-area">{pick(c.areaEs, c.areaEn)}</h3>
                </div>
                <p className="hk-case-body" dangerouslySetInnerHTML={html(pick(c.bodyEs, c.bodyEn))} />
              </article>
            ))}
          </div>
          <p className="hk-why-close">{pick(data.whyCloseEs, data.whyCloseEn)}</p>
        </div>
      </section>

      {/* Tracks */}
      <section className="section alt">
        <div className="container">
          <h2 id="retos" className="section-title">
            {s.tracksTitle}
          </h2>
          <div className="hk-tracks">
            {data.tracks.map((track, i) => (
              <div className={`hk-track ${track.accent}`} key={i}>
                <div className="hk-track-bar"></div>
                <div className="hk-track-tx">
                  <h3>{pick(track.titleEs, track.titleEn)}</h3>
                  <p className="hk-track-desc">{pick(track.descEs, track.descEn)}</p>
                  <ul className="hk-track-subs">
                    {track.subareas.map((sub, si) => (
                      <li key={si}>{pick(sub.es, sub.en)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{s.agendaTitle}</h2>
          <p className="hk-agenda-note">{s.agendaNote}</p>
          <ol className="hk-timeline">
            {schedule.map((day, i) => (
              <li
                key={i}
                className={`hk-tl-item ${day.accent ?? ["is-green", "is-blue", "is-yellow"][i % 3]}`}
                style={{ "--ti": i } as React.CSSProperties}
              >
                <span className="hk-tl-marker">{i + 1}</span>
                <div className="hk-tl-body">
                  <span className="hk-tl-day">{pick(day.day, day.dayEn)}</span>
                  <ul className="hk-tl-acts">
                    {day.events.map((ev, ei) => {
                      const note = pick(ev.note, ev.noteEn);
                      return (
                        <li className="hk-tl-act" key={ei}>
                          <span className="hk-tl-time">{pick(ev.time, ev.timeEn)}</span>
                          <span className="hk-tl-act-tx">
                            {pick(ev.title, ev.titleEn)}
                            {note && <span className="hk-tl-note">{note}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <div className="hk-deliverable">
            <span className="hk-deliverable-ic" dangerouslySetInnerHTML={html(deliverableIcon)} />
            <div className="hk-deliverable-tx">
              <span className="hk-deliverable-label">{s.deliverableLabel}</span>
              <p>{submission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">{s.prizesTitle}</h2>
          <div className="hk-prize">
            <p className="hk-prize-amount">{pick(data.prizesDetail.amountEs, data.prizesDetail.amountEn)}</p>
            <p className="hk-prize-head">{pick(data.prizesDetail.headlineEs, data.prizesDetail.headlineEn)}</p>
            <p className="hk-prize-total">{pick(data.prizesDetail.totalEs, data.prizesDetail.totalEn)}</p>
            <div className="hk-pills">
              {data.prizesDetail.perks.map((perk, i) => (
                <span className="hk-pill" key={i}>
                  {pick(perk.es, perk.en)}
                </span>
              ))}
            </div>
            <p
              className="hk-prize-extra"
              dangerouslySetInnerHTML={html(pick(data.prizesDetail.fellowsEs, data.prizesDetail.fellowsEn))}
            />
            <div className="hk-success">
              <h3 className="hk-success-title">
                {pick(data.prizesDetail.successTitleEs, data.prizesDetail.successTitleEn)}
              </h3>
              <ul className="hk-success-list">
                {data.prizesDetail.successExamples.map((ex, i) => (
                  <li key={i} dangerouslySetInnerHTML={html(pick(ex.es, ex.en))} />
                ))}
              </ul>
              <a
                className="hk-success-src"
                href="https://apartresearch.com/impact"
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.sourceLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hubs */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{s.hubsTitle}</h2>
          <div className="hk-globe-wrap">
            <div className="hk-globe" aria-hidden="true">
              <svg viewBox="0 0 240 240" role="presentation" focusable="false">
                <defs>
                  <radialGradient id="hkOcean" cx="40%" cy="34%" r="80%">
                    <stop offset="0%" stopColor="#F4FBF7" />
                    <stop offset="58%" stopColor="#E6F5EC" />
                    <stop offset="100%" stopColor="#D2EBDD" />
                  </radialGradient>
                  <radialGradient id="hkShade" cx="36%" cy="30%" r="78%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
                    <stop offset="54%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0A3D24" stopOpacity="0.20" />
                  </radialGradient>
                  <clipPath id="hkGlobeClip">
                    <circle cx="120" cy="120" r="90" />
                  </clipPath>
                  <pattern id="hkDots" width="6.6" height="6.6" patternUnits="userSpaceOnUse">
                    <circle cx="2.1" cy="2.1" r="1.45" fill="#1F4D32" />
                  </pattern>
                  {/* Equirectangular world map (one 240-wide tile = full globe). */}
                  <g id="hkLand" fill="url(#hkDots)">
                    {/* North America */}
                    <path d="M22 70 C18 60 31 53 45 53 C59 51 75 56 83 64 C87 70 82 79 76 83 C84 87 86 97 80 105 C74 113 64 113 60 121 C58 127 56 133 52 133 C48 129 50 118 46 112 C40 108 34 108 30 100 C24 94 28 86 26 80 C25 76 23 73 22 70 Z" />
                    {/* Greenland */}
                    <path d="M98 52 C106 50 113 54 111 62 C109 69 100 71 96 66 C93 62 94 55 98 52 Z" />
                    {/* South America */}
                    <path d="M70 127 C79 125 89 130 91 140 C93 150 86 159 84 169 C82 179 78 191 72 195 C68 197 65 188 65 180 C65 170 60 162 62 152 C63 143 64 133 70 127 Z" />
                    {/* Europe */}
                    <path d="M116 66 C122 62 132 62 140 66 C146 69 144 76 138 78 C132 80 128 84 122 82 C117 80 112 78 112 72 C112 69 114 67 116 66 Z" />
                    {/* Africa */}
                    <path d="M120 86 C132 84 146 87 152 97 C156 105 152 115 150 124 C156 128 156 136 150 141 C146 151 142 163 134 171 C128 177 124 170 124 162 C124 150 116 143 116 131 C116 118 110 108 112 98 C113 92 115 88 120 86 Z" />
                    {/* Asia */}
                    <path d="M146 74 C150 64 162 58 178 58 C198 56 219 60 228 70 C232 78 226 87 218 89 C224 95 222 105 214 107 C206 109 198 105 192 109 C190 117 188 127 182 129 C178 131 176 122 176 114 C170 116 164 114 162 108 C156 110 150 106 148 98 C146 90 144 82 146 74 Z" />
                    {/* SE Asia / Indonesia */}
                    <ellipse cx="192" cy="120" rx="4" ry="2.4" />
                    <ellipse cx="202" cy="127" rx="5" ry="2.6" />
                    <ellipse cx="210" cy="121" rx="3" ry="2" />
                    {/* Australia */}
                    <path d="M203 143 C211 141 221 143 225 151 C227 159 220 167 212 169 C204 171 198 164 198 156 C198 150 199 146 203 143 Z" />
                  </g>
                </defs>
                <circle cx="120" cy="120" r="90" fill="url(#hkOcean)" />
                <g clipPath="url(#hkGlobeClip)">
                  <g className="hk-globe-rot">
                    <use href="#hkLand" />
                    <use href="#hkLand" x="240" />
                  </g>
                </g>
                <circle cx="120" cy="120" r="90" fill="url(#hkShade)" />
                <g className="hk-grid" stroke="rgba(33,26,18,0.10)" fill="none" strokeWidth="1">
                  <circle cx="120" cy="120" r="90" stroke="rgba(33,26,18,0.18)" />
                  <ellipse cx="120" cy="120" rx="45" ry="90" />
                  <ellipse cx="120" cy="120" rx="90" ry="45" />
                  <line x1="30" y1="120" x2="210" y2="120" />
                  <line x1="120" y1="30" x2="120" y2="210" />
                </g>
                <g className="hk-arcs" strokeLinecap="round" fill="none" strokeWidth="2">
                  <path d="M92 150 Q 118 92 140 168" />
                  <path d="M92 150 Q 150 108 172 102" />
                </g>
                <circle className="hk-node is-coral" cx="140" cy="168" r="5" />
                <circle className="hk-node is-blue" cx="172" cy="102" r="5" />
                <circle className="hk-hub-halo" cx="92" cy="150" r="9" />
                <circle className="hk-hub-core" cx="92" cy="150" r="5.5" />
                <ellipse
                  className="hk-orbit"
                  cx="120"
                  cy="120"
                  rx="110"
                  ry="46"
                  fill="none"
                  stroke="var(--accent-forest)"
                  strokeWidth="1.5"
                  strokeDasharray="3 9"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="hk-regions">
              {regions.map((region, ri) => (
                <article className={`hk-region ${region.accent}`} key={ri}>
                  <div className="hk-region-head">
                    <h3>{pick(region.nameEs, region.nameEn)}</h3>
                    <span className="hk-region-meta">
                      {pick(region.teamsEs, region.teamsEn)} · {pick(region.prizeEs, region.prizeEn)}
                    </span>
                  </div>
                  <ul className="hk-cities">
                    {region.cities.map((city, ci) => (
                      <li
                        key={ci}
                        className={`hk-city${city.bogota ? " is-bogota" : ""}${city.tbd ? " is-tbd" : ""}`}
                        style={{ "--ci": ci } as React.CSSProperties}
                      >
                        <span className="hk-city-dot" aria-hidden="true"></span>
                        <span className="hk-city-name">{es ? (city.nameEs ?? city.name) : city.name}</span>
                        {city.bogota && <span className="hk-city-tag">{s.ourHub}</span>}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <p className="hk-note">{s.hubsNote}</p>
        </div>
      </section>

      {/* Speakers */}
      <section className="section alt">
        <div className="container">
          <h2 className="section-title">{s.speakersTitle}</h2>
          <div className="hk-people">
            {speakers.map((sp, i) => {
              const bio = pick(sp.bioEs, sp.bioEn);
              return (
                <article className={`hk-person ${personAccents[i % 4]}`} key={sp.name}>
                  {avatar(sp)}
                  <div className="hk-person-tx">
                    <h3>{sp.name}</h3>
                    <p
                      className="hk-person-aff"
                      dangerouslySetInnerHTML={html(pick(sp.affiliationEs, sp.affiliationEn))}
                    />
                    {sp.attendance && (
                      <span className={`hk-att hk-att-${sp.attendance}`}>{attLabel(sp.attendance)}</span>
                    )}
                    {bio && <p className="hk-person-bio" dangerouslySetInnerHTML={html(bio)} />}
                    {personLinks(sp)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Judges */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{s.judgesTitle}</h2>
          {judges.length > 0 ? (
            <div className="hk-people">
              {judges.map((j, i) => {
                const aff = pick(j.affiliationEs, j.affiliationEn);
                const evalTopic = pick(j.evalTopicEs, j.evalTopicEn);
                const bio = pick(j.bioEs, j.bioEn);
                return (
                  <article className={`hk-person ${personAccents[i % 4]}`} key={j.name}>
                    {avatar(j)}
                    <div className="hk-person-tx">
                      <h3>{j.name}</h3>
                      {aff && <p className="hk-person-aff" dangerouslySetInnerHTML={html(aff)} />}
                      {j.attendance && (
                        <span className={`hk-att hk-att-${j.attendance}`}>{attLabel(j.attendance)}</span>
                      )}
                      {evalTopic && (
                        <p className="hk-person-eval">
                          <span className="hk-person-eval-label">{s.judgeEvalLabel}</span>
                          {evalTopic}
                        </p>
                      )}
                      {bio && <p className="hk-person-bio" dangerouslySetInnerHTML={html(bio)} />}
                      {personLinks(j)}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="hk-note">{s.judgesTba}</p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section hk-faq-section" id="faq">
        <div className="container">
          <h2 className="section-title">{s.faqHeading}</h2>
          <ul className="hk-faq-list">
            {faqs.map((f, i) => (
              <li key={i}>
                <details open={i === 0}>
                  <summary>
                    <span className="hk-faq-q">{f.q}</span>
                    <span className="hk-faq-chev" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="hk-faq-a">
                    <p>{f.a}</p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />

      {/* Final CTA */}
      <section className="alt-cta">
        <div className="container alt-cta-grid">
          <div>
            <p className="alt-eyebrow">{s.finalKicker}</p>
            <h2>{s.finalTitle}</h2>
          </div>
          <span className="btn btn-closed" aria-disabled="true">
            {s.closedButton}
          </span>
        </div>
      </section>

      {/* Partner strip */}
      <section className="partners" aria-label={s.partnersTitle}>
        <div className="container">
          <p className="partners-title">{s.partnersTitle}</p>

          <a className="partner-feature" href="https://apartresearch.com/" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/globalsouth/apart.png"
              alt="Apart Research"
              width={320}
              height={120}
              loading="lazy"
              decoding="async"
              className="partner-feature-logo"
            />
            <p className="partner-feature-name">Apart Research</p>
            <p className="partner-feature-desc">{s.apartDescriptor}</p>
          </a>

          <div className="partners-support">
            <p className="partners-support-eyebrow">{s.supportEyebrow}</p>
            <p className="partners-support-name">Schmidt Sciences</p>
          </div>
        </div>
      </section>
    </>
  );
}
