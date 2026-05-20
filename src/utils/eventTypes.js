// AA-safe tag colors for event formats, mapped to the Swiss palette
// (forest #1F4D32, vermillion #E63946, sage #4A8466, ink #0A0F0C,
// forest-deep #0D2A1A). Labels and one-line descriptions are localized in
// src/i18n/ui.ts (events.type.* / events.type.*Desc); color is not localized.
// Shared by EventCard (tag) and EventsPage (format legend).
export const TYPE_COLOR = {
  charla: '#1F4D32',
  panel: '#E63946',
  conversatorio: '#4A8466',
  cena: '#0A0F0C',
  taller: '#1F4D32',
  curso: '#0D2A1A',
};

export const typeColor = (type) => TYPE_COLOR[type] ?? '#0A0F0C';
