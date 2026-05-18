// AA-safe tag colors for event formats, mirroring the approved Style 2 mockup
// (green #15803D, coral #FF5645, darkened blue #0090c4, ink #101010,
// yellow-line #B07A00). Labels and one-line descriptions are localized in
// src/i18n/ui.ts (events.type.* / events.type.*Desc); color is not localized.
// Shared by EventCard (tag) and EventsPage (format legend).
export const TYPE_COLOR = {
  charla: '#15803D',
  panel: '#FF5645',
  conversatorio: '#0090c4',
  cena: '#101010',
  taller: '#15803D',
  curso: '#B07A00',
};

export const typeColor = (type) => TYPE_COLOR[type] ?? '#101010';
