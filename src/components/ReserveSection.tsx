import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, MapPin, Coffee } from 'lucide-react';
import { soundscape } from '../utils/audioAmbience';

export const ReserveSection: React.FC = () => {
  const [date, setDate] = useState('2026-10-06');
  const [time, setTime] = useState('10:00 AM');
  const [guests, setGuests] = useState(2);
  const [zone, setZone] = useState<'window' | 'leather-lounge' | 'communal-oak' | 'courtyard'>('window');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const timeSlots = ['08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

  const seatingZones = [
    {
      id: 'window',
      title: 'Sunlit Window Bench',
      desc: 'Filtered natural morning light, view of the bamboo courtyard.',
    },
    {
      id: 'leather-lounge',
      title: 'Leather Roastery Corner',
      desc: 'Deep caramel leather armchairs adjacent to our vintage book collection.',
    },
    {
      id: 'communal-oak',
      title: 'Communal Oak Workbench',
      desc: 'Hand-hewn solid Japanese oak with subtle brass power ports.',
    },
    {
      id: 'courtyard',
      title: 'Garden Maple Terrace',
      desc: 'Open-air stone courtyard under Japanese red maple leaves.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    soundscape.playChime();
    const ref = `KOHI-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setName('');
    setEmail('');
    setNotes('');
  };

  return (
    <section id="reserve" className="w-full py-16 lg:py-24 bg-[#F8F5EE] border-t border-[#231C18]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#827163] font-medium mb-2">
            <span>Atelier Spaces</span>
            <span aria-hidden="true">·</span>
            <span>Quiet Hospitality</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1714] font-normal tracking-tight text-balance">
            Reserve a Quiet Table or Study Corner
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#594C42] leading-relaxed">
            We reserve 40% of our seating for mindful coffee rituals, reading, and contemplative work. Walk-ins are always warmly welcomed at our main brew bar.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-[#F1ECE1] rounded-2xl border border-[#231C18]/10 p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          {isBooked ? (
            /* Confirmation State */
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-[#1E1714] text-[#E89D71] rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <div className="text-xs uppercase tracking-widest font-mono text-[#827163]">
                  Reservation Confirmed
                </div>
                <h3 className="font-serif text-3xl text-[#1E1714] font-normal">
                  We look forward to hosting you, {name}
                </h3>
                <p className="text-xs text-[#594C42]">
                  A confirmation summary has been logged for your arrival. Your table will be pre-steeped with warm mineral water and seasonal tasting notes.
                </p>
              </div>

              {/* Booking Pass / Ticket Card */}
              <div className="bg-[#F8F5EE] border border-[#231C18]/15 rounded-xl p-6 max-w-md mx-auto text-left shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#231C18]/10">
                  <span className="font-serif font-medium text-lg text-[#1E1714]">Atelier Kōhī Table Pass</span>
                  <span className="font-mono text-xs font-semibold text-[#B86B3E]">{bookingRef}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#827163] block">Date</span>
                    <span className="font-medium text-[#1E1714]">{date}</span>
                  </div>
                  <div>
                    <span className="text-[#827163] block">Time</span>
                    <span className="font-medium text-[#1E1714]">{time}</span>
                  </div>
                  <div>
                    <span className="text-[#827163] block">Seating</span>
                    <span className="font-medium text-[#1E1714] capitalize">{zone.replace('-', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-[#827163] block">Guests</span>
                    <span className="font-medium text-[#1E1714]">{guests} Guest{guests > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#706054] flex items-center gap-1.5 border-t border-[#231C18]/10">
                  <MapPin className="w-3.5 h-3.5 text-[#B86B3E]" />
                  <span>412 Kōhī Lane, Roastery Quarter, Kyoto</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Seating Zone */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-3">
                  1. Select Seating Atmosphere
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingZones.map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setZone(z.id as typeof zone)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        zone === z.id
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714] shadow-sm'
                          : 'bg-[#F8F5EE] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      <div className="font-serif text-base font-medium">{z.title}</div>
                      <div className={`text-xs mt-1 leading-relaxed ${zone === z.id ? 'text-white/80' : 'text-[#706054]'}`}>
                        {z.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date, Time & Party */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B86B3E]" /> Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F8F5EE] border border-[#231C18]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1714] focus:outline-none focus:border-[#B86B3E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B86B3E]" /> Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#F8F5EE] border border-[#231C18]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1714] focus:outline-none focus:border-[#B86B3E]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B86B3E]" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#F8F5EE] border border-[#231C18]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1714] focus:outline-none focus:border-[#B86B3E]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest (Solo Reader)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kenji Tanaka"
                    className="w-full bg-[#F8F5EE] border border-[#231C18]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1714] focus:outline-none focus:border-[#B86B3E]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#F8F5EE] border border-[#231C18]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1714] focus:outline-none focus:border-[#B86B3E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#706054] mb-2">
                  Special Hospitality Requests (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Near electrical outlet for writing, quiet corner, celebrating an anniversary"
                  className="w-full bg-[#F8F5EE] border border-[#231C18]/15 rounded-lg px-3.5 py-2.5 text-xs text-[#1E1714] focus:outline-none focus:border-[#B86B3E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#1E1714] hover:bg-[#342923] text-[#F8F5EE] font-medium text-sm rounded-lg transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B86B3E]"
                >
                  Confirm Table Reservation
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
