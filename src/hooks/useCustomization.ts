import { useEffect } from 'react';
import type { EquippedItems } from '../types/marketplace';

/** Sync equipped customization to the document root for CSS theming. */
export function useCustomization(equipped: EquippedItems, checkmark: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', equipped.theme);
    root.setAttribute('data-checkmark', checkmark);
  }, [equipped.theme, checkmark]);
}

export function getBadgeIcon(badgeId: string): string | null {
  const badges: Record<string, string> = {
    'badge-star': '⭐',
    'badge-flame': '🔥',
    'badge-sword': '⚔️',
    'badge-crown': '👑',
    'badge-dragon': '🐉',
  };
  return badges[badgeId] ?? null;
}
