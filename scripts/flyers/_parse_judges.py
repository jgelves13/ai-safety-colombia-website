"""Parse Apify harvestapi profile dump into readable per-judge summaries.

Reads judges_linkedin_raw.json, writes judges_linkedin_parsed.md (human-readable
summary of each profile: headline + current positions + past experience + about).
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
RAW = HERE / "judges_linkedin_raw.json"
OUT = HERE / "judges_linkedin_parsed.md"

def fmt_position(p):
    title = p.get("title") or p.get("position") or ""
    company = p.get("companyName") or (p.get("company") or {}).get("name") or ""
    desc = p.get("description") or ""
    start = p.get("start") or {}
    end = p.get("end") or {}
    sy = start.get("year") or ""
    ey = end.get("year") or "Presente"
    period = f"{sy}–{ey}" if sy else ""
    line = f"  • **{title}** @ {company}  ({period})"
    if desc:
        snippet = " ".join(desc.split())[:300]
        line += f"\n    > {snippet}"
    return line

def main():
    data = json.loads(RAW.read_text(encoding="utf-8"))
    lines = []
    for it in data:
        # Items can be either wrapper (with element=null on 404) or flat profile
        if "element" in it and not it.get("element"):
            err_query = (it.get("query") or {}).get("query", "?")
            lines.append(f"\n## ❌ FAILED: {err_query}\n  error: {it.get('error')}\n")
            continue
        first = it.get("firstName", "")
        last = it.get("lastName", "")
        name = f"{first} {last}".strip()
        url = it.get("linkedinUrl", "")
        headline = it.get("headline") or ""
        about = it.get("about") or ""
        about_snippet = " ".join(about.split())[:600]
        lines.append(f"\n## {name}")
        lines.append(f"- URL: {url}")
        lines.append(f"- Headline: {headline}")
        if about_snippet:
            lines.append(f"- About: {about_snippet}")
        lines.append("")
        lines.append("### Current positions")
        cps = it.get("currentPosition") or []
        if cps:
            for p in cps:
                lines.append(fmt_position(p))
        else:
            lines.append("  (none)")
        lines.append("")
        lines.append("### Experience (recent)")
        exp = it.get("experience") or []
        for p in exp[:8]:
            lines.append(fmt_position(p))
        lines.append("")
        lines.append("### Education")
        edu = it.get("education") or []
        for e in edu[:3]:
            school = e.get("schoolName", "?")
            degree = e.get("degreeName") or e.get("fieldOfStudy") or ""
            sy = (e.get("start") or {}).get("year", "")
            ey = (e.get("end") or {}).get("year", "")
            lines.append(f"  • {school} — {degree}  ({sy}–{ey})")
        lines.append("")
        skills = it.get("skills") or []
        if skills:
            sk = [s.get("name", "") if isinstance(s, dict) else str(s) for s in skills[:10]]
            lines.append(f"### Skills: {', '.join(sk)}")
        pubs = it.get("publications") or []
        if pubs:
            lines.append("### Publications")
            for p in pubs[:5]:
                t = p.get("title", "")
                pub = p.get("publisher", "")
                lines.append(f"  • {t} ({pub})")
        awards = it.get("honorsAndAwards") or []
        if awards:
            lines.append("### Honors")
            for a in awards[:5]:
                lines.append(f"  • {a.get('title','')} — {a.get('issuer','')}")
        lines.append("\n---")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT.name} ({len(OUT.read_text(encoding='utf-8'))} chars)")

if __name__ == "__main__":
    main()
