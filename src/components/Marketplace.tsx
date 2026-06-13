import { useState } from 'react';
import { SHOP_ITEMS, getShopItem } from '../data/marketplace';
import type { EquippedItems, ShopCategory } from '../types/marketplace';
import { CATEGORY_LABELS } from '../types/marketplace';

interface MarketplaceProps {
  coins: number;
  owned: string[];
  equipped: EquippedItems;
  onPurchase: (itemId: string) => void;
  onEquip: (itemId: string) => void;
}

const CATEGORIES: ShopCategory[] = ['theme', 'mascot', 'frame', 'checkmark', 'badge'];

export function Marketplace({ coins, owned, equipped, onPurchase, onEquip }: MarketplaceProps) {
  const [category, setCategory] = useState<ShopCategory>('theme');
  const ownedSet = new Set(owned);

  const items = SHOP_ITEMS.filter((i) => i.category === category);

  const equippedInCategory = equipped[category === 'mascot' ? 'mascot' : category];

  return (
    <section className="marketplace">
      <div className="marketplace-header panel">
        <div>
          <h2>🛒 Cozy Marketplace</h2>
          <p className="marketplace-subtitle">Spend coins on themes, scenes, frames, and flair</p>
        </div>
        <div className="marketplace-balance">
          <span className="marketplace-balance-icon">🪙</span>
          <span className="marketplace-balance-value">{coins}</span>
          <span className="marketplace-balance-label">coins</span>
        </div>
      </div>

      <nav className="marketplace-categories" aria-label="Shop categories">
        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_LABELS[cat];
          return (
            <button
              key={cat}
              type="button"
              className={`marketplace-cat-btn ${category === cat ? 'marketplace-cat-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {meta.icon} {meta.label}
            </button>
          );
        })}
      </nav>

      <div className="marketplace-grid">
        {items.map((item) => {
          const isOwned = ownedSet.has(item.id) || item.starter;
          const isEquipped = equippedInCategory === item.id;
          const canAfford = coins >= item.price;

          return (
            <article
              key={item.id}
              className={`shop-item panel rarity-${item.rarity} ${isEquipped ? 'shop-item-equipped' : ''}`}
            >
              <div
                className="shop-item-preview"
                style={item.preview ? { background: item.preview } : undefined}
              >
                <span className="shop-item-icon">{item.icon}</span>
                {isEquipped && <span className="shop-item-equipped-tag">Equipped</span>}
              </div>

              <div className="shop-item-body">
                <div className="shop-item-head">
                  <h3>{item.name}</h3>
                  <span className={`shop-rarity rarity-${item.rarity}`}>{item.rarity}</span>
                </div>
                <p className="shop-item-desc">{item.description}</p>

                <div className="shop-item-actions">
                  {isOwned ? (
                    <button
                      type="button"
                      className={`btn btn-sm ${isEquipped ? 'btn-secondary' : 'btn-primary'}`}
                      disabled={isEquipped}
                      onClick={() => onEquip(item.id)}
                    >
                      {isEquipped ? 'Equipped' : 'Equip'}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      disabled={!canAfford}
                      onClick={() => onPurchase(item.id)}
                    >
                      {canAfford ? (
                        <>
                          Buy · <span className="shop-price">🪙 {item.price}</span>
                        </>
                      ) : (
                        <>Need 🪙 {item.price - coins} more</>
                      )}
                    </button>
                  )}
                  {!isOwned && (
                    <span className="shop-price-tag">🪙 {item.price}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="marketplace-equipped panel">
        <h3>Currently equipped</h3>
        <div className="equipped-row">
          {(Object.keys(equipped) as (keyof EquippedItems)[]).map((slot) => {
            const item = getShopItem(equipped[slot]);
            const slotLabel = CATEGORY_LABELS[slot === 'mascot' ? 'mascot' : slot]?.label ?? slot;
            return (
              <div key={slot} className="equipped-slot">
                <span className="equipped-slot-label">{slotLabel}</span>
                <span className="equipped-slot-value">
                  {item ? `${item.icon} ${item.name}` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
