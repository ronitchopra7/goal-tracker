export type ShopCategory = 'theme' | 'mascot' | 'frame' | 'checkmark' | 'badge';

export type ShopRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface ShopItem {
  id: string;
  category: ShopCategory;
  name: string;
  description: string;
  icon: string;
  price: number;
  rarity: ShopRarity;
  /** Included for all players from the start */
  starter?: boolean;
  preview?: string;
}

export interface EquippedItems {
  theme: string;
  mascot: string;
  frame: string;
  checkmark: string;
  badge: string;
}

export interface Inventory {
  owned: string[];
  equipped: EquippedItems;
}

export const DEFAULT_EQUIPPED: EquippedItems = {
  theme: 'theme-cozy',
  mascot: 'scene-cozy',
  frame: 'frame-none',
  checkmark: 'check-classic',
  badge: 'badge-none',
};

export const CATEGORY_LABELS: Record<ShopCategory, { label: string; icon: string }> = {
  theme: { label: 'Themes', icon: '🎨' },
  mascot: { label: 'Scenes', icon: '🌙' },
  frame: { label: 'Frames', icon: '🖼️' },
  checkmark: { label: 'Checkmarks', icon: '✓' },
  badge: { label: 'Title Badges', icon: '🏷️' },
};
