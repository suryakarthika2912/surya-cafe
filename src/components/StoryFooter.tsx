import React, { useState } from 'react';
import { CAFE_HOURS, CAFE_LOCATION, BAKERY_IMAGE } from '../data/coffeeData';
import { MapPin, Mail, Phone, Check, ArrowRight } from 'lucide-react';
import { soundscape } from '../utils/audioAmbience';

export const StoryFooter: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    soundscape.playChime();
    setSubscribed(true);
  };

  return (
    <footer id="story" className="w-full bg-[#1E1714] text-[#F8F5EE] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E89D71] font-mono">
              <span>Atelier Ethos</span>
              <span aria-hidden="true">·</span>
              <span>Founded 2018</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-balance">
              Where Japanese Kissaten Reverence Meets Modern Nordic Roast Clarity.
            </h2>

            <p className="text-sm text-white/70 leading-relaxed max-w-xl">
              In a world hurried by convenience, we choose patience. We honor the grower who harvested the cherries on mountain terraces, the roaster who listens for the subtle crackle of the drum, and the drinker who pauses to breathe in the floral jasmine steam.
            </p>

            {/* Newsletter input */}
            <div className="pt-2 max-w-md">
              <span className="text-xs uppercase tracking-wider text-white/60 block mb-2 font-mono">
                The Friday Cupping Sheet (Roastery Dispatches)
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#E89D71] bg-white/5 border border-white/10 rounded-lg p-3">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the circle. Fresh roast notifications will reach your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#E89D71]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#E89D71] hover:bg-[#d8895b] text-[#1E1714] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
              <img
                src={BAKERY_IMAGE}
                alt="Cozy bakery pastries and espresso in morning light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="font-serif text-lg text-white font-medium">Boulangerie & Espresso</span>
                <span className="text-xs text-white/70 mt-0.5">Laminated pastries baked twice daily at 06:00 and 11:30</span>
              </div>
            </div>
          </div>

        </div>

        {/* Roastery Info, Hours & Map Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-white/10 text-xs">
          
          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-3">
              Roastery Atelier Hours
            </h4>
            <div className="space-y-2 text-white/70">
              {CAFE_HOURS.map((h, i) => (
                <div key={i} className="pb-2 border-b border-white/5">
                  <div className="text-white font-medium">{h.day}</div>
                  <div className="text-[#E89D71] font-mono">{h.hours}</div>
                  <div className="text-[11px] text-white/50">{h.roastSession}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-3">
              Location & Neighborhood
            </h4>
            <div className="space-y-2 text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E89D71] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{CAFE_LOCATION.address}</p>
                  <p className="text-white/60">{CAFE_LOCATION.subway}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 text-[#E89D71] shrink-0" />
                <span className="font-mono">{CAFE_LOCATION.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E89D71] shrink-0" />
                <span>{CAFE_LOCATION.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg text-white font-medium mb-3">
              The Four Principles
            </h4>
            <ul className="space-y-1.5 text-white/70 leading-relaxed">
              <li><strong className="text-white">I. Terroir:</strong> Micro-lots sourced directly from named farm estates.</li>
              <li><strong className="text-white">II. Craft:</strong> Slow drum roasting with zero automated profiles.</li>
              <li><strong className="text-white">III. Water:</strong> Custom remineralized mountain spring formulation.</li>
              <li><strong className="text-white">IV. Quiet:</strong> Preserving a calm sanctuary for readers and thinkers.</li>
            </ul>
          </div>

        </div>

        {/* Minimal Editorial Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif text-base text-white">Atelier Kōhī</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved © 2026</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Sourcing Ethics</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Brew Standards</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Privacy & Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
