export type DockAppId =
  | 'notes'
  | 'browser'
  | 'camera'
  | 'gallery'
  | 'calendar'
  | 'messages'
  | 'favorites'
  | 'mail';

export interface DockAppItem {
  id: DockAppId;
  label: string;
  subtitle: string;
  description: string;
  accentHex: string;
}

export type ProductCategory = 'All' | 'Creative' | 'Productivity' | 'Communication';

export interface MoharProduct {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  releaseTag: string;
  summary: string;
  dockAppId: DockAppId;
}

export interface NoteEntry {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
}

export interface MessageEntry {
  id: string;
  sender: string;
  text: string;
  time: string;
  fromMe?: boolean;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  stage: string;
}

export interface AuthFormInput {
  mode: 'login' | 'signup';
  name: string;
  email: string;
  password: string;
}

export interface AuthValidationResult {
  valid: boolean;
  errors: Partial<Record<'name' | 'email' | 'password', string>>;
}

export const DOCK_APPS: DockAppItem[] = [
  {
    id: 'notes',
    label: 'Notes',
    subtitle: 'Writing & Field Sketches',
    description: 'Draft unhurried product essays, release outlines, and quiet studio notes.',
    accentHex: '#EAB308',
  },
  {
    id: 'browser',
    label: 'Browser',
    subtitle: 'Compass & Discovery',
    description: 'Explore curated references, classical archives, and shipped web experiments.',
    accentHex: '#0EA5E9',
  },
  {
    id: 'camera',
    label: 'Camera',
    subtitle: 'Visual Capture',
    description: 'Frame atmospheric studies and capture visual snapshots for your moodboard.',
    accentHex: '#6B7280',
  },
  {
    id: 'gallery',
    label: 'Gallery',
    subtitle: 'Photos & Paintings',
    description: 'Inspect curated visual artifacts, Renaissance studies, and interface stills.',
    accentHex: '#EC4899',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    subtitle: 'Seasons & Shipping Dates',
    description: 'Track seasonal blooms, studio critiques, and upcoming launch windows.',
    accentHex: '#EF4444',
  },
  {
    id: 'messages',
    label: 'Messages',
    subtitle: 'Studio Dispatches',
    description: 'Exchange concise notes with collaborators across design and engineering.',
    accentHex: '#22C55E',
  },
  {
    id: 'favorites',
    label: 'Favorites',
    subtitle: 'Saved Inspirations',
    description: 'Keep treasured references, prototypes, and tools pinned close at hand.',
    accentHex: '#F97316',
  },
  {
    id: 'mail',
    label: 'Mail',
    subtitle: 'Letters & Releases',
    description: 'Compose thoughtful release letters and connect directly with the MoHaR team.',
    accentHex: '#A855F7',
  },
];

export const MOHAR_PRODUCTS: MoharProduct[] = [
  {
    id: 'folio-notes',
    name: 'MoHaR Folio',
    category: 'Productivity',
    releaseTag: 'Writing Suite · Web',
    summary: 'Distraction-free manuscript and specification editor crafted for makers who think in paragraphs before tickets.',
    dockAppId: 'notes',
  },
  {
    id: 'atelier-gallery',
    name: 'Atelier Canvas',
    category: 'Creative',
    releaseTag: 'Visual Archive · Studio',
    summary: 'Organize classical references, interface frames, and color studies into museum-grade visual boards.',
    dockAppId: 'gallery',
  },
  {
    id: 'compass-index',
    name: 'Compass Index',
    category: 'Creative',
    releaseTag: 'Discovery · Curated',
    summary: 'A calm spatial browser for collecting timeless typography, art history, and web craft.',
    dockAppId: 'browser',
  },
  {
    id: 'solstice-calendar',
    name: 'Solstice Rhythm',
    category: 'Productivity',
    releaseTag: 'Release Cadence · Team',
    summary: 'Plan unhurried bloom cycles and crisp shipping milestones without noisy sprint dashboards.',
    dockAppId: 'calendar',
  },
  {
    id: 'aperture-study',
    name: 'Aperture Lens',
    category: 'Creative',
    releaseTag: 'Capture · Light',
    summary: 'Quickly capture visual inspiration and warm tonal palettes directly into your workspace.',
    dockAppId: 'camera',
  },
  {
    id: 'courier-mail',
    name: 'Courier Dispatch',
    category: 'Communication',
    releaseTag: 'Letters · Audience',
    summary: 'Send essays, changelogs, and seasonal dispatches that read like keepsake letters.',
    dockAppId: 'mail',
  },
  {
    id: 'parlor-messages',
    name: 'Parlor Thread',
    category: 'Communication',
    releaseTag: 'Studio Chat · Calm',
    summary: 'Asynchronous collaborator threads built around thoughtful critique rather than constant pings.',
    dockAppId: 'messages',
  },
];

export const INITIAL_NOTES: NoteEntry[] = [
  {
    id: 'n-1',
    title: 'Bloom First Manifesto',
    body: 'Let ideas mature in quiet light before rushing them to production. Taste compounds when given space.',
    updatedAt: 'Today, 09:40',
  },
  {
    id: 'n-2',
    title: 'Autumn Release Checklist',
    body: 'Finalize pixel-bordered navigation, polish dock tooltips, and verify responsive proportions.',
    updatedAt: 'Yesterday',
  },
];

export const INITIAL_MESSAGES: MessageEntry[] = [
  {
    id: 'm-1',
    sender: 'Aria · Design',
    text: 'The pastoral oil palette balances the electric blue pixel borders beautifully.',
    time: '10:12',
  },
  {
    id: 'm-2',
    sender: 'Kenji · Engineering',
    text: 'All eight dock modules are live and ready for the showcase launch.',
    time: '10:18',
  },
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  { id: 'e-1', date: 'Nov 28', title: 'MoHaR Autumn Showcase', stage: 'Public Release' },
  { id: 'e-2', date: 'Dec 04', title: 'Typography & Pixel Craft Critique', stage: 'Studio Review' },
  { id: 'e-3', date: 'Dec 15', title: 'Winter Collection Bloom Window', stage: 'Exploration' },
];

export const INITIAL_FAVORITE_IDS: string[] = ['folio-notes', 'atelier-gallery', 'courier-mail'];

export function filterProducts(
  products: MoharProduct[],
  category: ProductCategory
): MoharProduct[] {
  if (category === 'All') {
    return products;
  }
  return products.filter((item) => item.category === category);
}

export function validateAuthForm(input: AuthFormInput): AuthValidationResult {
  const errors: AuthValidationResult['errors'] = {};
  const trimmedEmail = input.email.trim();
  const trimmedName = input.name.trim();

  if (input.mode === 'signup' && trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (input.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function addNoteItem(
  notes: NoteEntry[],
  title: string,
  body: string
): NoteEntry[] {
  const cleanTitle = title.trim();
  const cleanBody = body.trim();
  if (!cleanTitle || !cleanBody) return notes;

  const nextNote: NoteEntry = {
    id: `n-${Date.now()}-${notes.length + 1}`,
    title: cleanTitle,
    body: cleanBody,
    updatedAt: 'Just now',
  };
  return [nextNote, ...notes];
}

export function toggleFavoriteItem(favoriteIds: string[], productId: string): string[] {
  if (favoriteIds.includes(productId)) {
    return favoriteIds.filter((id) => id !== productId);
  }
  return [...favoriteIds, productId];
}

export function sendMessageItem(
  messages: MessageEntry[],
  text: string,
  senderName = 'You'
): MessageEntry[] {
  const cleanText = text.trim();
  if (!cleanText) return messages;
  return [
    ...messages,
    {
      id: `m-${Date.now()}-${messages.length + 1}`,
      sender: senderName,
      text: cleanText,
      time: 'Now',
      fromMe: true,
    },
  ];
}

export interface CreatorApplicationInput {
  creatorName: string;
  productTitle: string;
  goalAmount: string;
}

export interface CreatorValidationResult {
  valid: boolean;
  errors: Partial<Record<'creatorName' | 'productTitle' | 'goalAmount', string>>;
}

export function validateCreatorForm(
  input: CreatorApplicationInput
): CreatorValidationResult {
  const errors: CreatorValidationResult['errors'] = {};
  if (input.creatorName.trim().length < 2) {
    errors.creatorName = 'Please enter your creator or brand name.';
  }
  if (input.productTitle.trim().length < 3) {
    errors.productTitle = 'Please describe your product idea (at least 3 characters).';
  }
  const numericGoal = Number(input.goalAmount.replace(/[^0-9.]/g, ''));
  if (!input.goalAmount.trim() || Number.isNaN(numericGoal) || numericGoal < 1000) {
    errors.goalAmount = 'Enter a target batch goal of at least ₹1,000.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

