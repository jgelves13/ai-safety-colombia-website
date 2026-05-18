/** A past or upcoming AI Safety Colombia event, sourced from src/data/events.json. */
export interface AisEvent {
  slug: string;
  type: string;
  date: string; // ISO date, YYYY-MM-DD
  time?: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  venueEs: string;
  venueEn: string;
  whyEs: string;
  whyEn: string;
  flyer: string;
  instagramUrl: string;
  featured?: boolean;
}
