import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle, ArrowRight, Sparkles, Coffee } from 'lucide-react';
import { CartItem } from '../types/coffee';
import { soundscape } from '../utils/audioAmbience';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pickupMode, setPickupMode] = useState<'bar' | 'table'>('bar');
  const [tableNumber, setTableNumber] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const tax = subtotal * 0.08;
  const tip = (subtotal * tipPercent) / 100;
  const total = subtotal + tax + tip;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SLOWMORNING') {
      setDiscountPercent(15);
      setPromoMessage('15% Autumn Solstice Discount Applied!');
      soundscape.playChime();
    } else {
      setPromoMessage('Code not recognized. Try "SLOWMORNING".');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;

    soundscape.playChime();
    setOrderId(`AK-${Math.floor(1000 + Math.random() * 9000)}`);
    setOrderComplete(true);
  };

  const handleStartFresh = () => {
    onClearCart();
    setOrderComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#F8F5EE] h-full flex flex-col shadow-2xl border-l border-[#231C18]/15 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#231C18]/10 bg-[#F1ECE1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl text-[#1E1714]">Order Bag</span>
            <span className="text-xs text-[#827163] font-mono tabular-nums">
              ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#594C42] hover:text-[#1E1714] rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderComplete ? (
            /* Post Order Success Receipt */
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-[#1E1714] text-[#E89D71] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#827163]">
                  Order Placed Successfully
                </span>
                <h3 className="font-serif text-3xl text-[#1E1714] mt-1">
                  Brewing Now for {customerName}
                </h3>
                <p className="text-xs text-[#594C42] mt-2">
                  Order <span className="font-mono font-bold text-[#1E1714]">{orderId}</span> is now queued at the espresso bar. Estimated prep: 10–14 minutes.
                </p>
              </div>

              {/* Progress Timeline */}
              <div className="bg-[#F1ECE1] p-4 rounded-xl border border-[#231C18]/10 text-left space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#1E1714] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#B86B3E] animate-ping" />
                  <span>Grinding & Dialing Extraction</span>
                </div>
                <div className="flex items-center gap-2 text-[#827163]">
                  <span className="w-2 h-2 rounded-full bg-[#827163]/40" />
                  <span>Steaming Silk Microfoam & Pouring</span>
                </div>
                <div className="flex items-center gap-2 text-[#827163]">
                  <span className="w-2 h-2 rounded-full bg-[#827163]/40" />
                  <span>
                    {pickupMode === 'bar' ? 'Ready at Main Bar Counter' : `Delivering to Table ${tableNumber || '4'}`}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartFresh}
                  className="w-full py-3 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Place Another Order
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EAE2D3] flex items-center justify-center text-[#827163]">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#1E1714]">Your bag is peaceful & empty</p>
                <p className="text-xs text-[#706054] mt-1">Explore our single-origin harvests and morning pastries.</p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#1E1714] text-[#F8F5EE] text-xs font-medium rounded-lg hover:bg-[#342923] transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#231C18]/10">
                <span className="font-serif text-lg text-[#1E1714]">Customer Details</span>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#B86B3E] hover:underline"
                >
                  Back to Bag
                </button>
              </div>

              {/* Service Method */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Service Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPickupMode('bar')}
                    className={`p-2.5 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      pickupMode === 'bar'
                        ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                        : 'bg-[#F1ECE1] text-[#231C18] border-transparent'
                    }`}
                  >
                    Bar Counter Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupMode('table')}
                    className={`p-2.5 text-center text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      pickupMode === 'table'
                        ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                        : 'bg-[#F1ECE1] text-[#231C18] border-transparent'
                    }`}
                  >
                    Table Delivery
                  </button>
                </div>

                {pickupMode === 'table' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter Table Number (e.g. 7)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#F1ECE1] border border-[#231C18]/15 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B86B3E]"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Name & Phone */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#F1ECE1] border border-[#231C18]/15 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B86B3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-1">
                    Mobile Phone (For Order SMS Alert)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 555-019-2831"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#F1ECE1] border border-[#231C18]/15 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B86B3E]"
                  />
                </div>
              </div>

              {/* Payment Method Notice */}
              <div className="p-3.5 bg-[#F1ECE1] rounded-xl border border-[#231C18]/10 text-xs text-[#594C42] space-y-1">
                <span className="font-semibold text-[#1E1714]">Payment on Arrival:</span>
                <p>Pay with Apple Pay, contactless card, or cash when receiving your items.</p>
              </div>

              {/* Tip Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-1.5">
                  Support Our Baristas (Tip)
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 10, 15, 18].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercent(pct)}
                      className={`py-1.5 text-center text-xs font-mono rounded border transition-all cursor-pointer ${
                        tipPercent === pct
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F1ECE1] text-[#231C18] border-transparent'
                      }`}
                    >
                      {pct === 0 ? 'None' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between px-4 cursor-pointer"
              >
                <span>Authorize & Send Order</span>
                <span className="font-mono tabular-nums text-[#E89D71]">${total.toFixed(2)}</span>
              </button>
            </form>
          ) : (
            /* Itemized List */
            <div className="space-y-6">
              <div className="space-y-4">
                {cart.map((cartItem) => {
                  const { item, customization, quantity, itemPrice } = cartItem;
                  return (
                    <div
                      key={cartItem.id}
                      className="p-4 bg-[#F1ECE1] rounded-xl border border-[#231C18]/10 space-y-3"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-serif font-medium text-sm text-[#1E1714]">
                            {item.name}
                          </h4>
                          
                          {/* Unboxed customizations */}
                          {customization && (
                            <div className="text-[11px] text-[#706054] mt-1 space-y-0.5">
                              {customization.bagWeight && (
                                <div>Weight: {customization.bagWeight} · Grind: {customization.grind}</div>
                              )}
                              {customization.temp && (
                                <div className="capitalize">
                                  {customization.temp} · {customization.size} · {customization.milk} milk
                                </div>
                              )}
                              {customization.sweetness && customization.sweetness !== '0%' && (
                                <div>Sweetness: {customization.sweetness}</div>
                              )}
                              {customization.extraShot && <div>+ Extra Espresso Shot</div>}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <span className="font-mono text-sm font-semibold tabular-nums text-[#1E1714]">
                            ${(itemPrice * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#231C18]/10">
                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="text-[11px] text-[#827163] hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>

                        <div className="flex items-center gap-2 bg-[#F8F5EE] border border-[#231C18]/10 rounded-md p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, quantity - 1)}
                            className="p-1 text-[#594C42] hover:text-[#1E1714] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center font-mono text-xs font-medium tabular-nums">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, quantity + 1)}
                            className="p-1 text-[#594C42] hover:text-[#1E1714] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder='Promo code ("SLOWMORNING")'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#F1ECE1] border border-[#231C18]/15 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#B86B3E]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#EAE2D3] hover:bg-[#1E1714] hover:text-[#F8F5EE] text-[#1E1714] text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className="text-[11px] text-[#B86B3E] font-medium">{promoMessage}</p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculation & Primary CTA */}
        {!orderComplete && cart.length > 0 && !isCheckingOut && (
          <div className="p-6 border-t border-[#231C18]/10 bg-[#F1ECE1] space-y-3">
            <div className="space-y-1 text-xs text-[#706054]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-[#1E1714]">${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#B86B3E]">
                  <span>Autumn Discount (15%)</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-mono tabular-nums text-[#1E1714]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1E1714] pt-2 border-t border-[#231C18]/10">
                <span>Total Due</span>
                <span className="font-mono tabular-nums">${(subtotal + tax).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
