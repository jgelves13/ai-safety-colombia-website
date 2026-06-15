# Acceptance emails + confirmation page

Flow for inviting the ~40 selected participants and collecting their confirmation.

## 1. Set up the Supabase table (once)

Run `supabase/hub_confirmations.sql` in the Supabase SQL editor (project `aisc-hackathon`).
It uses the same `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` env vars the apply form already uses.

## 2. The confirmation page

Lives at **`/confirmar/`** (`https://aisafetycolombia.org/confirmar/`). It is `noindex`
and unlinked from navigation — only people with the link reach it.

It collects, in one submission:
- Friday 19 kickoff attendance (mandatory checkbox)
- Saturday + Sunday availability in coarse blocks (≥2 blocks/day = 8h minimum)
- WhatsApp phone number (country code + number)
- Final commitment checkbox

On submit it writes a row to `hub_confirmations` and shows the WhatsApp group link.
Confirmations close **Mon 2026-06-15 18:00 Colombia** (`/api/confirmar` enforces this server-side).

The link can prefill name + email: `/confirmar/?email=foo@bar.com&nombre=Jose`.
The send script builds these per-person automatically.

## 3. Send the acceptance emails

1. Export the accepted list to a CSV with columns: `firstName,email,reason,locale`
   (`locale` optional, default `es`). `reason` is the ONE-LINE personalized
   "why your profile stood out" — Alejo's rule: always say WHY. See
   `scripts/acceptances.sample.csv`.

2. Preview without sending:
   ```
   pnpm send-acceptances scripts/acceptances.sample.csv --dry-run
   ```
   Writes HTML previews to `tmp/acceptance-preview/`. Open them in a browser.

3. Send for real (needs `RESEND_API_KEY` in env or `.env.local`):
   ```
   pnpm send-acceptances path/to/accepted.csv
   ```
   Use `--limit N` to send to only the first N rows (good for a test to yourself first).
   A results log is written to `tmp/acceptance-send-results.csv`.

Optional env overrides: `APPLICANT_FROM_EMAIL` (default `hackathon@aisafetycolombia.org`),
`HUB_CONTACT_EMAIL` (default `contacto@aisafetycolombia.org`),
`CONFIRM_BASE_URL` (default `https://aisafetycolombia.org`).

> Resend free tier is 100 emails/day — 40 acceptances is well within it.
> The script paces sends ~600ms apart.
