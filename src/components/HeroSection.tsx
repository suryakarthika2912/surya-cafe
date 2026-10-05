import React from 'react';
import { ArrowDown, Sparkles, Clock, Flame, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../data/coffeeData';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenBrewLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onOpenBrewLab,
}) => {
  return (
    <section id="hero" className="relative w-full pt-6 pb-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle Kicker (Clean unboxed text, no pill) */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#827163] font-medium mb-4">
          <span>Kyoto Roastery Atelier</span>
          <span aria-hidden="true">·</span>
          <span>Single-Origin Harvests</span>
          <span aria-hidden="true">·</span>
          <span>Slow Extraction</span>
        </div>

        {/* 2-Column Split: Editorial Prose & Cinematic Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#1E1714] text-balance">
              The Architecture <br />
              <span className="italic font-light text-[#8A512E]">of Morning Silence</span> & Coffee.
            </h1>

            <p className="text-base sm:text-lg text-[#594C42] leading-relaxed max-w-xl">
              Every roast begins with intention. Sourced exclusively from high-altitude regenerative micro-lots in Colombia, Ethiopia, and Panama—roasted weekly on our vintage cast iron drum and pulled with surgical micro-milligram precision.
            </p>

            {/* Unboxed Metadata Trust Markers */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#706054] pt-2 border-t border-[#231C18]/10">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#B86B3E]" />
                <span>Batch roasted today at 06:15 AM</span>
              </div>
              <span aria-hidden="true" className="text-[#B6A794]">·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B86B3E]" />
                <span>Slow Pour-Over Bar Open</span>
              </div>
              <span aria-hidden="true" className="text-[#B6A794]">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B86B3E]" />
                <span>Gion-Shijo Quarter</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E]"
              >
                Explore Autumn Menu & Order
              </button>
              <button
                onClick={onOpenBrewLab}
                className="px-6 py-3.5 bg-[#EAE2D3] hover:bg-[#DFD5C4] text-[#1E1714] text-sm font-medium rounded-lg transition-colors cursor-pointer border border-[#231C18]/10 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#B86B3E]" />
                <span>Interactive Pour-Over Lab</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] shadow-xl border border-[#231C18]/10 bg-[#EDE6DC]">
              <img
                src={HERO_IMAGE}
                alt="Artisanal specialty coffee cup with rosette latte art on dark wood and raw stone counter"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Photo Caption Overlay (Clean unboxed text) */}
              <div className="absolute bottom-4 left-4 right-4 text-[#F8F5EE] flex justify-between items-end text-xs">
                <div>
                  <p className="font-serif text-sm font-medium">House Roast Velvet Microfoam</p>
                  <p className="text-white/80">Huila Pink Bourbon · Double Ristretto</p>
                </div>
                <div className="text-right font-mono text-[11px] text-white/70">
                  <span>9 bar / 27 sec / 93.5°C</span>
                </div>
              </div>
            </div>

            {/* Floating Micro Note Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#F8F5EE] border border-[#231C18]/10 rounded-xl p-4 shadow-lg max-w-xs items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EAE2D3] flex items-center justify-center text-[#B86B3E] font-serif text-lg font-semibold shrink-0">
                珈
              </div>
              <div className="text-xs">
                <p className="font-medium text-[#1E1714]">Artisanal Heritage</p>
                <p className="text-[#706054]">Japanese Kissaten reverence meets Scandinavian light roast clarity.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
