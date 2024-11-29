const TERMS_MENU = [
  { term: '2023-03-01', label: '23-1' },
  { term: '2023-09-01', label: '23-2' },
  { term: '2024-03-01', label: '24-1' },
  { term: '2024-09-01', label: '24-2' },
  { term: '', label: '전체' },
];

const TERMS_MENU_REVERSE = [...TERMS_MENU].reverse();

const TERMS_LABEL = TERMS_MENU.map(({ label }) => label);

const SLICED_TERMS_LABEL = TERMS_LABEL.slice(0, -1);

export { TERMS_MENU, TERMS_MENU_REVERSE, TERMS_LABEL, SLICED_TERMS_LABEL };
