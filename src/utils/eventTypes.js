// Tag colors for event formats, mapped to the Trópico palette
// (forest #1F4D32, coral-dark #CF4A39, sage #4A8466, ink #211A12,
// forest-deep #143620). Labels and one-line descriptions are localized in
// src/i18n/ui.ts (events.type.* / events.type.*Desc); color is not localized.
// Shared by EventCard (tag) and EventsPage (format legend).
export const TYPE_COLOR = {
  charla: '#1F4D32',
  panel: '#CF4A39',
  conversatorio: '#4A8466',
  cena: '#211A12',
  taller: '#1F4D32',
  curso: '#143620',
};

export const typeColor = (type) => TYPE_COLOR[type] ?? '#211A12';
