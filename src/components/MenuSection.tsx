import React, { useState } from 'react';
import { CoffeeCategory, MenuItem } from '../types/coffee';
import { MENU_ITEMS } from '../data/coffeeData';
import { Plus, Sparkles } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState<CoffeeCategory>('all');

  const categories: { id: CoffeeCategory; label: string }[] = [
    { id: 'all', label: 'Complete Atelier' },
    { id: 'signature', label: 'Signature Extractions' },
    { id: 'espresso', label: 'Espresso Bar' },
    { id: 'filter', label: 'Slow Pour-Over' },
    { id: 'bakery', label: 'Artisanal Bakery' },
    { id: 'beans', label: 'Roasted Whole Beans' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="menu" className="w-full py-16 lg:py-24 border-t border-[#231C18]/10 bg-[#F4F0E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#827163] font-medium mb-2">
            <span>Handcrafted Daily</span>
            <span aria-hidden="true">·</span>
            <span>Kyoto Roastery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1714] font-normal tracking-tight text-balance">
            Seasonal Menu & Barista Selections
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#594C42] leading-relaxed">
            Every beverage is pulled to order with dialed extraction parameters. Fresh pastries are baked each morning at dawn using French cultured butter and stone-ground flours.
          </p>
        </div>

        {/* Interactive Filter Tabs (Functional segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EAE2D3] rounded-xl overflow-x-auto mb-10 border border-[#231C18]/10 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#1E1714] text-[#F8F5EE] shadow-xs'
                  : 'text-[#594C42] hover:text-[#1E1714] hover:bg-[#F1ECE1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid: 3-column desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group bg-[#F8F5EE] rounded-2xl border border-[#231C18]/10 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[16/10] bg-[#EAE2D3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Subtle text tags (zero-pill discipline: unboxed clean text) */}
                <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-medium tracking-wide text-white drop-shadow-sm">
                  {item.isSignature && (
                    <span className="flex items-center gap-1 bg-[#1E1714]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      <Sparkles className="w-3 h-3 text-[#E89D71]" />
                      Signature
                    </span>
                  )}
                  {item.isSeasonal && (
                    <span className="bg-[#B86B3E]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      Autumn Harvest
                    </span>
                  )}
                </div>

                {/* Price Baseline Overlay */}
                <div className="absolute bottom-3 right-3 bg-[#1E1714]/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[#F8F5EE] font-mono text-sm font-semibold tabular-nums">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Category & Japanese subtitle */}
                  <div className="flex items-center gap-2 text-xs text-[#827163] uppercase tracking-wider mb-1">
                    <span>{item.category}</span>
                    {item.japaneseSubtitle && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-serif normal-case tracking-normal">{item.japaneseSubtitle}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-medium text-[#1E1714] group-hover:text-[#B86B3E] transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs text-[#594C42] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Unboxed Metadata: Tasting Notes separated by · */}
                <div className="pt-3 border-t border-[#231C18]/10 space-y-2">
                  <div className="text-xs text-[#706054]">
                    <span className="font-medium text-[#1E1714]">Notes: </span>
                    <span>{item.tastingNotes.slice(0, 3).join(' · ')}</span>
                  </div>

                  {item.origin && (
                    <div className="text-[11px] text-[#827163] truncate">
                      <span className="font-medium">Origin: </span>
                      <span>{item.origin}</span>
                    </div>
                  )}

                  {/* Order / Customize Action Button */}
                  <button
                    onClick={() => onSelectItem(item)}
                    className="w-full mt-2 py-2.5 px-4 bg-[#EAE2D3] hover:bg-[#1E1714] text-[#1E1714] hover:text-[#F8F5EE] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{item.isBeanBag ? 'Select Roast & Bag Size' : 'Customize & Add to Order'}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
