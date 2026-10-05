/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { BrewLabSection } from './components/BrewLabSection';
import { BeansShowcase } from './components/BeansShowcase';
import { ReserveSection } from './components/ReserveSection';
import { StoryFooter } from './components/StoryFooter';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { MenuItem, CartItem, CartCustomization } from './types/coffee';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('menu');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddToCart = (
    item: MenuItem,
    customization: CartCustomization,
    quantity: number,
    calculatedPrice: number
  ) => {
    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newItem: CartItem = {
      id: cartItemId,
      menuItemId: item.id,
      item,
      quantity,
      customization,
      itemPrice: calculatedPrice,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#231C18] flex flex-col font-sans selection:bg-[#E89D71]/30 selection:text-[#1E1714]">
      {/* 1-Row, 3-Zone Top Bar Contract */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreMenu={() => handleNavigate('menu')}
          onOpenBrewLab={() => handleNavigate('brew-lab')}
        />

        {/* Seasonal Menu & Ordering */}
        <MenuSection onSelectItem={(item) => setCustomizingItem(item)} />

        {/* Interactive Pour-Over Lab & Ratio Calculator */}
        <BrewLabSection />

        {/* Single Origin Terroir Beans */}
        <BeansShowcase onSelectBean={(bean) => setCustomizingItem(bean)} />

        {/* Table & Study Corner Reservation */}
        <ReserveSection />
      </main>

      {/* Story & Atelier Roastery Footer */}
      <StoryFooter />

      {/* Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
