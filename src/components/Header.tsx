import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { soundscape } from '../utils/audioAmbience';
import { CartItem } from '../types/coffee';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);

  const toggleSoundscape = () => {
    if (isAudioPlaying) {
      soundscape.stop();
      setIsAudioPlaying(false);
    } else {
      soundscape.start(0.28);
      setIsAudioPlaying(true);
    }
  };

  const navLinks = [
    { id: 'menu', label: 'Menu & Order' },
    { id: 'brew-lab', label: 'Pour-Over Lab' },
    { id: 'origins', label: 'Single Origins' },
    { id: 'reserve', label: 'Table Reserve' },
    { id: 'story', label: 'Atelier Story' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#231C18]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('hero')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E] rounded"
        >
          <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#1E1714] group-hover:text-[#B86B3E] transition-colors">
            Atelier Kōhī
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#594C42]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors pb-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#1E1714] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#B86B3E]'
                    : 'hover:text-[#1E1714]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Ambient Cafe Sound Toggle */}
          <button
            onClick={toggleSoundscape}
            title={isAudioPlaying ? 'Mute cozy cafe soundscape' : 'Play ambient cafe soundscape (vinyl crackle & soft rain)'}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer border ${
              isAudioPlaying
                ? 'bg-[#EAE2D3] text-[#1E1714] border-[#B86B3E]/40 shadow-xs'
                : 'bg-transparent text-[#706054] hover:text-[#1E1714] border-transparent hover:border-[#231C18]/10'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#B86B3E] animate-pulse" />
                <span className="hidden sm:inline">Soundscape Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Cafe Ambience</span>
              </>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-4 py-2 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-xs font-medium rounded-lg transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B86B3E] focus-visible:outline-none"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#E89D71]" />
            <span className="whitespace-nowrap font-medium">
              Bag {totalItemsCount > 0 && <span className="tabular-nums">({totalItemsCount})</span>}
            </span>
            {totalItemsCount > 0 && (
              <span className="hidden sm:inline-block pl-2 border-l border-white/20 tabular-nums font-mono text-[11px] text-[#E89D71]">
                ${cartSubtotal.toFixed(2)}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1E1714] hover:bg-[#EAE2D3] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#231C18]/10 bg-[#F8F5EE] px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2 text-base font-medium text-[#231C18] hover:text-[#B86B3E] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#231C18]/10 flex items-center justify-between text-xs text-[#706054]">
            <span>Hours: Mon–Sun 07:00–19:00</span>
            <span>Gion-Shijo, Kyoto</span>
          </div>
        </div>
      )}
    </header>
  );
};
