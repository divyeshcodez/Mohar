import { useState } from 'react';
import { Check, Heart, X } from 'lucide-react';
import {
  MOHAR_PRODUCTS,
  filterProducts,
  type ProductCategory,
} from '../data/moharData';

interface ExploreProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  backedIds: string[];
  onToggleBacked: (productId: string) => void;
}

const CATEGORIES: ProductCategory[] = ['All', 'Craft', 'Design', 'Tech'];

export function ExploreProductsModal({
  isOpen,
  onClose,
  backedIds,
  onToggleBacked,
}: ExploreProductsModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  if (!isOpen) return null;

  const visibleProducts = filterProducts(MOHAR_PRODUCTS, selectedCategory);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="explore-products-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#F7F3EB] text-stone-900 shadow-2xl border border-stone-300/80 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-300/70">
          <div>
            <p className="text-xs font-medium tracking-wide text-stone-500">
              MoHaR Drops · Pre-order what you love
            </p>
            <h2
              id="explore-products-title"
              className="mt-1 text-2xl sm:text-3xl font-semibold text-stone-900"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Explore Products
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Explore Products"
            className="p-2 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-200/70 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3.5 border-b border-stone-200/90 flex items-center justify-between flex-wrap gap-3 bg-[#EFEAE0]/70">
          <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-stone-200/70">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-white text-[#1700D1] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <span className="text-xs text-stone-500 tabular-nums">
            Showing {visibleProducts.length} of {MOHAR_PRODUCTS.length} ideas
          </span>
        </div>

        <div className="overflow-y-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleProducts.map((product) => {
            const isBacked = backedIds.includes(product.id);
            return (
              <article
                key={product.id}
                className="flex flex-col justify-between p-4 rounded-xl bg-white/90 border border-stone-200/90 hover:border-stone-400/80 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-stone-900">{product.name}</h3>
                    <span className="text-sm font-bold text-stone-900 tabular-nums shrink-0">
                      {product.earlyBirdPrice}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-500">
                    {product.creator} · {product.fundedPercent}% funded
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-stone-700">
                    {product.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center justify-between">
                  <span className="text-xs text-stone-500">{product.category}</span>
                  <button
                    type="button"
                    onClick={() => onToggleBacked(product.id)}
                    aria-pressed={isBacked}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      isBacked
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-stone-900 text-white hover:bg-stone-800'
                    }`}
                  >
                    {isBacked ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Backed</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-3.5 h-3.5" />
                        <span>Back Early-Bird</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
