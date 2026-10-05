import React from 'react';
import { BEANS_IMAGE, MENU_ITEMS } from '../data/coffeeData';
import { MenuItem } from '../types/coffee';
import { Award, Compass, Sun, ShoppingBag } from 'lucide-react';

interface BeansShowcaseProps {
  onSelectBean: (item: MenuItem) => void;
}

export const BeansShowcase: React.FC<BeansShowcaseProps> = ({ onSelectBean }) => {
  const beanItems = MENU_ITEMS.filter((item) => item.category === 'beans');

  return (
    <section id="origins" className="w-full py-16 lg:py-24 bg-[#F4F0E8] border-t border-[#231C18]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#827163] font-medium mb-2">
            <span>The Roastery Cellar</span>
            <span aria-hidden="true">·</span>
            <span>Direct Farm Trade</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1714] font-normal tracking-tight text-balance">
            Single Origin Roastery Harvests
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#594C42] leading-relaxed">
            We purchase green coffee directly from smallholder generational farmers at 300% above Fair Trade minimums. Roasted weekly in 4kg micro-batches to preserve terroir and delicate aromatics.
          </p>
        </div>

        {/* Feature Grid with Photography & Editorial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Big Photography Showcase Card */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#1E1714] text-[#F8F5EE] flex flex-col justify-between p-6 sm:p-8 min-h-[380px] shadow-lg border border-[#231C18]/15">
            <img
              src={BEANS_IMAGE}
              alt="Freshly roasted specialty single origin coffee beans spilling on linen"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity hover:opacity-60 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714] via-[#1E1714]/60 to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#E89D71] mb-2 uppercase">
                <Compass className="w-3.5 h-3.5" /> Direct Terroir Sourcing
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
                Roasted on Vintage 1968 Cast Iron
              </h3>
            </div>

            <div className="relative z-10 pt-8 space-y-4">
              <p className="text-xs text-white/80 leading-relaxed">
                Slow conductive heat transfer through cast iron drum allows even core caramelization without surface scorching. Preserving florals, stone fruits, and natural honey sweetness.
              </p>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/70">
                <div className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#E89D71]" />
                  <span>Next Roast: Thursday 06:00 AM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#E89D71]" />
                  <span>SCA 88+ Micro Lots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Roastery Bags Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {beanItems.map((bean) => (
              <div
                key={bean.id}
                className="bg-[#F8F5EE] rounded-2xl border border-[#231C18]/10 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#827163] font-mono">
                      {bean.roastLevel} Roast
                    </span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-[#1E1714]">
                      ${bean.price.toFixed(2)}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-medium text-[#1E1714]">
                    {bean.name.replace('Whole Bean: ', '')}
                  </h4>
                  {bean.japaneseSubtitle && (
                    <div className="text-xs text-[#827163] font-serif mb-2">
                      {bean.japaneseSubtitle}
                    </div>
                  )}

                  <p className="text-xs text-[#594C42] leading-relaxed mt-2 line-clamp-3">
                    {bean.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#231C18]/10 space-y-3">
                  <div className="text-xs text-[#706054]">
                    <span className="font-medium text-[#1E1714]">Tasting Notes: </span>
                    <span>{bean.tastingNotes.join(' · ')}</span>
                  </div>

                  {bean.elevation && (
                    <div className="flex items-center justify-between text-[11px] text-[#827163]">
                      <span>Elevation: {bean.elevation}</span>
                      <span>Lot: 2026 Reserve</span>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectBean(bean)}
                    className="w-full py-2.5 px-4 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E89D71]" />
                    <span>Select Roast & Grind</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
