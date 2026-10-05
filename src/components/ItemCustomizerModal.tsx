import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, CartCustomization, CupSize, MilkChoice, TemperatureChoice, BeanOriginChoice, GrindChoice } from '../types/coffee';
import { soundscape } from '../utils/audioAmbience';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: CartCustomization, quantity: number, calculatedPrice: number) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<CupSize>('standard');
  const [milk, setMilk] = useState<MilkChoice>(item.category === 'filter' ? 'none' : 'oat');
  const [temp, setTemp] = useState<TemperatureChoice>('hot');
  const [bean, setBean] = useState<BeanOriginChoice>('house-blend');
  const [grind, setGrind] = useState<GrindChoice>('whole-bean');
  const [sweetness, setSweetness] = useState<'0%' | '25%' | '50%' | '100%'>('0%');
  const [extraShot, setExtraShot] = useState(false);
  const [bagWeight, setBagWeight] = useState<'250g' | '1kg'>('250g');

  // Calculate pricing based on options
  let finalUnitPrice = item.price;

  if (item.isBeanBag) {
    if (bagWeight === '1kg') {
      finalUnitPrice = item.price * 3.4; // 1kg bag pricing with slight discount
    }
  } else {
    // Drink modifiers
    if (size === 'cortado') finalUnitPrice -= 0.50;
    if (size === 'flat-white') finalUnitPrice -= 0.25;
    if (size === 'large') finalUnitPrice += 0.85;

    if (milk === 'pistachio') finalUnitPrice += 1.00;
    if (milk === 'oat' || milk === 'almond') finalUnitPrice += 0.65;

    if (bean === 'colombia-geisha') finalUnitPrice += 2.50;
    if (bean === 'ethiopia-yirgacheffe') finalUnitPrice += 1.00;

    if (extraShot) finalUnitPrice += 1.75;
  }

  const handleAdd = () => {
    soundscape.playChime();
    const customization: CartCustomization = item.isBeanBag
      ? { bagWeight, grind }
      : {
          size,
          milk,
          temp,
          bean,
          sweetness,
          extraShot,
        };

    onAddToCart(item, customization, quantity, finalUnitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-[#F8F5EE] border border-[#231C18]/15 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#231C18]/10 bg-[#F1ECE1]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#827163] uppercase tracking-wider mb-1">
              <span>{item.category.toUpperCase()}</span>
              {item.japaneseSubtitle && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-serif">{item.japaneseSubtitle}</span>
                </>
              )}
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#1E1714]">
              {item.name}
            </h3>
            <p className="text-xs text-[#594C42] mt-1 max-w-sm">
              {item.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#594C42] hover:text-[#1E1714] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Options Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {item.isBeanBag ? (
            /* Bean Bag Customizations */
            <>
              {/* Bag Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Package Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '250g', label: '250g Standard Bag', detail: 'Approx. 16 cups' },
                    { id: '1kg', label: '1kg Roastery Kilogram', detail: 'Approx. 65 cups' },
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setBagWeight(pkg.id as '250g' | '1kg')}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        bagWeight === pkg.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714] shadow-xs'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      <div className="font-medium text-sm">{pkg.label}</div>
                      <div className={`text-xs ${bagWeight === pkg.id ? 'text-[#E89D71]' : 'text-[#706054]'}`}>
                        {pkg.detail}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Method */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Grind Selection
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'whole-bean', label: 'Whole Bean (Fresh)' },
                    { id: 'pour-over', label: 'Pour-Over / V60' },
                    { id: 'chemex', label: 'Chemex Filter' },
                    { id: 'aeropress', label: 'AeroPress' },
                    { id: 'espresso', label: 'Fine Espresso' },
                    { id: 'french-press', label: 'Coarse Press' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGrind(g.id as GrindChoice)}
                      className={`p-2.5 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        grind === g.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Drink Customizations */
            <>
              {/* Temperature */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Temperature
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hot', label: 'Steamed Hot (65°C)' },
                    { id: 'iced', label: 'Over Clear Ice' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTemp(t.id as TemperatureChoice)}
                      className={`p-2.5 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        temp === t.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cup Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Cup Size & Extraction Ratio
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cortado', label: 'Cortado (4oz)', mod: '-$0.50' },
                    { id: 'flat-white', label: 'Flat (6oz)', mod: '-$0.25' },
                    { id: 'standard', label: 'Standard (8oz)', mod: 'Std' },
                    { id: 'large', label: 'Studio (12oz)', mod: '+$0.85' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSize(s.id as CupSize)}
                      className={`p-2 text-center rounded-lg border transition-all cursor-pointer ${
                        size === s.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      <div className="text-xs font-medium">{s.label}</div>
                      <div className={`text-[10px] ${size === s.id ? 'text-[#E89D71]' : 'text-[#706054]'}`}>
                        {s.mod}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Milk Base
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'oat', label: 'Oatly Barista', mod: '+$0.65' },
                    { id: 'whole', label: 'Organic Whole', mod: 'Included' },
                    { id: 'almond', label: 'House Almond', mod: '+$0.65' },
                    { id: 'pistachio', label: 'Pistachio Silk', mod: '+$1.00' },
                    { id: 'none', label: 'No Milk (Black)', mod: '—' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMilk(m.id as MilkChoice)}
                      className={`p-2 text-left rounded-lg border transition-all cursor-pointer ${
                        milk === m.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      <div className="text-xs font-medium">{m.label}</div>
                      <div className={`text-[10px] ${milk === m.id ? 'text-[#E89D71]' : 'text-[#706054]'}`}>
                        {m.mod}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bean Single Origin Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Single Origin Lot
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'house-blend', name: 'Atelier House Blend', notes: 'Milk Chocolate & Toffee', mod: 'Standard' },
                    { id: 'ethiopia-yirgacheffe', name: 'Ethiopia Yirgacheffe Gedeb', notes: 'Floral Jasmine & Bergamot', mod: '+$1.00' },
                    { id: 'colombia-geisha', name: 'Colombia Finca El Paraiso Geisha', notes: 'Lychee & Rose Water', mod: '+$2.50' },
                    { id: 'decaf-sugarcane', name: 'Sugarcane EA Decaf (Huila)', notes: 'Dark Cocoa & Blackberry', mod: '+$0.50' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBean(b.id as BeanOriginChoice)}
                      className={`w-full p-2.5 text-left rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                        bean === b.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium">{b.name}</div>
                        <div className={`text-[11px] ${bean === b.id ? 'text-[#E89D71]' : 'text-[#706054]'}`}>
                          {b.notes}
                        </div>
                      </div>
                      <span className="text-xs font-mono tabular-nums">{b.mod}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness Level & Extra Shot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                    Sweetness
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {(['0%', '25%', '50%', '100%'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSweetness(lvl)}
                        className={`py-1.5 text-center text-xs font-medium rounded border transition-all cursor-pointer ${
                          sweetness === lvl
                            ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                            : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                    Extra Shot
                  </label>
                  <button
                    type="button"
                    onClick={() => setExtraShot(!extraShot)}
                    className={`w-full py-1.5 px-3 text-xs font-medium rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                      extraShot
                        ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                        : 'bg-[#F1ECE1] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                    }`}
                  >
                    <span>+ Extra Espresso Pull</span>
                    <span className="font-mono text-[11px]">+$1.75</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Tasting Note Summary (Zero-Pill clean unboxed text) */}
          <div className="p-3 bg-[#EDE6DC] rounded-xl text-xs text-[#594C42] border border-[#231C18]/5">
            <span className="font-medium text-[#1E1714]">Flavor profile: </span>
            <span>{item.tastingNotes.join(' · ')}</span>
          </div>
        </div>

        {/* Footer with Quantity & Add to Cart */}
        <div className="p-6 border-t border-[#231C18]/10 bg-[#F1ECE1] flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-[#F8F5EE] border border-[#231C18]/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 text-[#594C42] hover:text-[#1E1714] hover:bg-[#EAE2D3] rounded cursor-pointer transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-mono text-sm font-semibold tabular-nums text-[#1E1714]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 text-[#594C42] hover:text-[#1E1714] hover:bg-[#EAE2D3] rounded cursor-pointer transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-5 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] rounded-lg font-medium text-sm flex items-center justify-between transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E]"
          >
            <span>Add to Order</span>
            <span className="font-mono tabular-nums text-[#E89D71]">
              ${(finalUnitPrice * quantity).toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
