export type DockAppId =
  | 'our-story'
  | 'explore'
  | 'launch'
  | 'trust'
  | 'ending-soon'
  | 'how-it-works'
  | 'my-backed'
  | 'talk-to-us';

export interface DockAppItem {
  id: DockAppId;
  label: string;
  subtitle: string;
  description: string;
  accentHex: string;
}

export type ProductCategory = 'All' | 'Design' | 'Craft' | 'Tech';

export interface MoharProduct {
  id: string;
  name: string;
  creator: string;
  category: Exclude<ProductCategory, 'All'>;
  earlyBirdPrice: string;
  fundedPercent: number;
  hoursLeft?: number;
  summary: string;
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

export interface CreatorApplicationInput {
  creatorName: string;
  productTitle: string;
  goalAmount: string;
}

export interface CreatorValidationResult {
  valid: boolean;
  errors: Partial<Record<'creatorName' | 'productTitle' | 'goalAmount', string>>;
}

export const DOCK_APPS: DockAppItem[] = [
  {
    id: 'our-story',
    label: 'Our Story',
    subtitle: 'Mango Blossom · Manifesto',
    description: 'Why MoHaR exists: bloom first, let people believe in it, and only then start the factory.',
    accentHex: '#EAB308',
  },
  {
    id: 'explore',
    label: 'Explore',
    subtitle: 'Compass · Discover Drops',
    description: 'Browse original Indian creator ideas and pre-order at early-bird prices.',
    accentHex: '#0EA5E9',
  },
  {
    id: 'launch',
    label: 'Launch',
    subtitle: 'Seed · Creator Launchpad',
    description: 'Share your product idea with zero upfront investment and let backers fund batch one.',
    accentHex: '#6B7280',
  },
  {
    id: 'trust',
    label: 'Trust',
    subtitle: 'Shield · Backer Protection',
    description: 'Your money stays protected in escrow and is automatically refunded if a goal is missed.',
    accentHex: '#EC4899',
  },
  {
    id: 'ending-soon',
    label: 'Ending soon',
    subtitle: 'Clock · Final Hours',
    description: 'Catch blooming campaigns in their final hours before early-bird pre-orders close.',
    accentHex: '#EF4444',
  },
  {
    id: 'how-it-works',
    label: 'How it works',
    subtitle: 'Gold Coin (Mohar) · Guide',
    description: 'From first idea to factory batch: how creators launch and backers pre-order safely.',
    accentHex: '#22C55E',
  },
  {
    id: 'my-backed',
    label: 'My Backed',
    subtitle: 'Heart · Your Pre-Orders',
    description: 'Track every creator product you have backed and watch its batch progress bloom.',
    accentHex: '#F97316',
  },
  {
    id: 'talk-to-us',
    label: 'Talk to us',
    subtitle: 'Envelope · Team Mohar',
    description: 'Questions about backing or launching your first batch? Write directly to Team Mohar.',
    accentHex: '#A855F7',
  },
];

export const MOHAR_PRODUCTS: MoharProduct[] = [
  {
    id: 'brass-dripper',
    name: 'Kansa Pour-Over Dripper',
    creator: 'Aarav Metalworks · Pune',
    category: 'Craft',
    earlyBirdPrice: '₹2,499',
    fundedPercent: 86,
    hoursLeft: 14,
    summary: 'Hand-spun bell-metal coffee dripper engineered for slow heat retention and clean extraction.',
  },
  {
    id: 'terracotta-lamp',
    name: 'Diya Table Lamp 01',
    creator: 'Mitti Studio · Jaipur',
    category: 'Design',
    earlyBirdPrice: '₹3,200',
    fundedPercent: 94,
    hoursLeft: 9,
    summary: 'Slip-cast terracotta diffuser paired with warm dimmable LED filament lighting.',
  },
  {
    id: 'pocket-synth',
    name: 'Swara Pocket Synth',
    creator: 'Dhwani Labs · Bengaluru',
    category: 'Tech',
    earlyBirdPrice: '₹6,800',
    fundedPercent: 72,
    hoursLeft: 26,
    summary: 'Tactile microtonal synthesizer designed for Indian ragas and portable beatmaking.',
  },
  {
    id: 'khadi-folio',
    name: 'Raw Khadi Carry Folio',
    creator: 'Tana Bana · Ahmedabad',
    category: 'Craft',
    earlyBirdPrice: '₹1,850',
    fundedPercent: 108,
    summary: 'Heavyweight handloom cotton sleeve with vegetable-tanned leather spine and brass clasp.',
  },
  {
    id: 'monsoon-clock',
    name: 'Monsoon Flip Desk Clock',
    creator: 'Kala Mechanical · Mumbai',
    category: 'Design',
    earlyBirdPrice: '₹4,150',
    fundedPercent: 64,
    hoursLeft: 19,
    summary: 'Quiet split-flap mechanical clock in brushed aluminum with custom Devanagari numerals.',
  },
  {
    id: 'modular-dock',
    name: 'Chitra Analog Film Scanner',
    creator: 'Nayan Optics · Chennai',
    category: 'Tech',
    earlyBirdPrice: '₹5,400',
    fundedPercent: 81,
    summary: 'Compact 35mm macro film holder with CRI-98 backlight made for home darkrooms.',
  },
];

export const INITIAL_BACKED_IDS: string[] = ['brass-dripper', 'terracotta-lamp'];

export function filterProducts(
  products: MoharProduct[],
  category: ProductCategory
): MoharProduct[] {
  if (category === 'All') {
    return products;
  }
  return products.filter((item) => item.category === category);
}

export function getEndingSoonProducts(products: MoharProduct[]): MoharProduct[] {
  return products
    .filter((p) => typeof p.hoursLeft === 'number')
    .sort((a, b) => (a.hoursLeft ?? 999) - (b.hoursLeft ?? 999));
}

export function toggleBackedItem(backedIds: string[], productId: string): string[] {
  if (backedIds.includes(productId)) {
    return backedIds.filter((id) => id !== productId);
  }
  return [...backedIds, productId];
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
