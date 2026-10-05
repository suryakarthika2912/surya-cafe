import React, { useState, useEffect, useRef } from 'react';
import { BREW_GUIDES, POUROVER_IMAGE } from '../data/coffeeData';
import { BrewMethod } from '../types/coffee';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Gauge, Clock, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/audioAmbience';

export const BrewLabSection: React.FC = () => {
  const [selectedMethodId, setSelectedMethodId] = useState<BrewMethod>('v60');
  const [coffeeDose, setCoffeeDose] = useState<number>(15);
  const [ratioMultiplier, setRatioMultiplier] = useState<number>(16);

  // Timer states
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const guide = BREW_GUIDES.find((g) => g.id === selectedMethodId) || BREW_GUIDES[0];

  // Recalculate water
  const totalWaterGrams = Math.round(coffeeDose * ratioMultiplier);

  // Sync default dose when method changes
  const handleMethodChange = (methodId: BrewMethod) => {
    setSelectedMethodId(methodId);
    const newGuide = BREW_GUIDES.find((g) => g.id === methodId);
    if (newGuide) {
      setCoffeeDose(newGuide.defaultDose);
      setRatioMultiplier(newGuide.ratio);
    }
    // reset timer
    setTimerRunning(false);
    setElapsedSeconds(0);
  };

  // Stopwatch timer interval
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning]);

  // Audio cue when timer completes or enters new step
  const lastStepIndex = useRef<number>(-1);
  const currentStepIndex = guide.steps.findIndex((step, idx) => {
    const nextStep = guide.steps[idx + 1];
    if (!nextStep) return true;
    return elapsedSeconds >= step.secondStart && elapsedSeconds < nextStep.secondStart;
  });

  useEffect(() => {
    if (timerRunning && currentStepIndex !== -1 && currentStepIndex !== lastStepIndex.current) {
      lastStepIndex.current = currentStepIndex;
      soundscape.playChime();
    }
  }, [currentStepIndex, timerRunning]);

  const toggleTimer = () => {
    if (!timerRunning) {
      soundscape.playChime();
    }
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setElapsedSeconds(0);
    lastStepIndex.current = -1;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="brew-lab" className="w-full py-16 lg:py-24 bg-[#F8F5EE] border-t border-[#231C18]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#827163] font-medium mb-2">
              <span>Interactive Ratio Lab</span>
              <span aria-hidden="true">·</span>
              <span>Barista Standards</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1714] font-normal tracking-tight text-balance">
              The Pour-Over Extraction Lab
            </h2>
            <p className="mt-3 text-sm text-[#594C42] leading-relaxed">
              Dial in extraction yield with scientific precision. Select your brewer, adjust your coffee dose, and follow the live multi-stage infusion stopwatch.
            </p>
          </div>

          {/* Quick Brewer Selector (Interactive tabs) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EAE2D3] rounded-xl border border-[#231C18]/10">
            {BREW_GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => handleMethodChange(g.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedMethodId === g.id
                    ? 'bg-[#1E1714] text-[#F8F5EE] shadow-xs'
                    : 'text-[#594C42] hover:text-[#1E1714]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Lab Station */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Parameters & Live Telemetry */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Control Sliders Card */}
            <div className="bg-[#F1ECE1] p-6 rounded-2xl border border-[#231C18]/10 space-y-6">
              
              {/* Coffee Dose Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#706054]">
                    Ground Coffee Dose
                  </label>
                  <span className="font-mono text-base font-semibold tabular-nums text-[#1E1714]">
                    {coffeeDose}g
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="45"
                  step="1"
                  value={coffeeDose}
                  onChange={(e) => setCoffeeDose(Number(e.target.value))}
                  className="w-full accent-[#B86B3E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#827163] mt-1 font-mono">
                  <span>12g (Solo cup)</span>
                  <span>20g (Standard)</span>
                  <span>45g (Carafe for 3)</span>
                </div>
              </div>

              {/* Brew Ratio Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#706054]">
                    Extraction Ratio (Coffee : Water)
                  </label>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#1E1714]">
                    1:{ratioMultiplier}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { r: 14, label: '1:14', desc: 'Heavy Body' },
                    { r: 15, label: '1:15', desc: 'Balanced' },
                    { r: 16, label: '1:16', desc: 'Modern' },
                    { r: 17, label: '1:17', desc: 'Floral Tea' },
                  ].map((item) => (
                    <button
                      key={item.r}
                      onClick={() => setRatioMultiplier(item.r)}
                      className={`p-2 rounded-lg text-center border transition-all cursor-pointer ${
                        ratioMultiplier === item.r
                          ? 'bg-[#1E1714] text-[#F8F5EE] border-[#1E1714]'
                          : 'bg-[#F8F5EE] text-[#231C18] border-transparent hover:border-[#231C18]/15'
                      }`}
                    >
                      <div className="font-mono text-xs font-bold">{item.label}</div>
                      <div className={`text-[10px] ${ratioMultiplier === item.r ? 'text-[#E89D71]' : 'text-[#706054]'}`}>
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Scientific Telemetry Grid (Tabular Numerals) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 bg-[#F1ECE1] rounded-xl border border-[#231C18]/10">
                <div className="flex items-center gap-1.5 text-xs text-[#827163] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-[#B86B3E]" />
                  <span>Total Water</span>
                </div>
                <div className="font-mono text-xl font-bold tabular-nums text-[#1E1714]">
                  {totalWaterGrams} <span className="text-xs font-normal">ml</span>
                </div>
              </div>

              <div className="p-4 bg-[#F1ECE1] rounded-xl border border-[#231C18]/10">
                <div className="flex items-center gap-1.5 text-xs text-[#827163] mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#B86B3E]" />
                  <span>Water Temp</span>
                </div>
                <div className="font-mono text-xl font-bold tabular-nums text-[#1E1714]">
                  {guide.tempC}°C <span className="text-xs font-normal">/ {Math.round(guide.tempC * 1.8 + 32)}°F</span>
                </div>
              </div>

              <div className="p-4 bg-[#F1ECE1] rounded-xl border border-[#231C18]/10">
                <div className="flex items-center gap-1.5 text-xs text-[#827163] mb-1">
                  <Gauge className="w-3.5 h-3.5 text-[#B86B3E]" />
                  <span>Grind Size</span>
                </div>
                <div className="text-xs font-medium text-[#1E1714] truncate">
                  {guide.grindName}
                </div>
                <div className="text-[10px] text-[#827163] font-mono truncate">
                  {guide.grindMicrons.split('·')[0]}
                </div>
              </div>

              <div className="p-4 bg-[#F1ECE1] rounded-xl border border-[#231C18]/10">
                <div className="flex items-center gap-1.5 text-xs text-[#827163] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#B86B3E]" />
                  <span>Target Time</span>
                </div>
                <div className="font-mono text-xl font-bold tabular-nums text-[#1E1714]">
                  {formatTime(guide.totalTimeSeconds)}
                </div>
              </div>
            </div>

            {/* Visual Guide Box */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/7] border border-[#231C18]/10 bg-[#EDE6DC]">
              <img
                src={POUROVER_IMAGE}
                alt="Artisanal pour-over brewing process with goose-neck kettle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1714]/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs text-[#F8F5EE]">
                  <span className="font-serif font-medium">{guide.name} Protocol</span> · Pour in slow, rhythmic concentric circles without breaking surface tension.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Infusion Stopwatch & Step Timeline */}
          <div className="lg:col-span-6 bg-[#F1ECE1] p-6 sm:p-8 rounded-2xl border border-[#231C18]/10 space-y-6">
            
            {/* Live Stopwatch Display */}
            <div className="bg-[#1E1714] text-[#F8F5EE] p-6 rounded-xl flex items-center justify-between shadow-inner">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#E89D71] font-mono">
                  {timerRunning ? 'BREWING IN PROGRESS' : 'STOPWATCH STANDBY'}
                </div>
                <div className="font-mono text-4xl sm:text-5xl font-light tracking-tight tabular-nums mt-1">
                  {formatTime(elapsedSeconds)}
                </div>
                <div className="text-xs text-white/60 font-mono mt-1">
                  Target: {formatTime(guide.totalTimeSeconds)}
                </div>
              </div>

              {/* Stopwatch Action Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className="p-3.5 rounded-full bg-[#E89D71] hover:bg-[#d8895b] text-[#1E1714] transition-transform active:scale-95 cursor-pointer shadow-md"
                  aria-label={timerRunning ? 'Pause timer' : 'Start timer'}
                >
                  {timerRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F5EE] transition-colors cursor-pointer"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Step-by-Step Brew Stages */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-[#706054]">
                <span>Stage Instructions</span>
                <span>Cumulative Weight</span>
              </div>

              <div className="space-y-2.5">
                {guide.steps.map((step, idx) => {
                  const isCurrent = currentStepIndex === idx && timerRunning;
                  const isPast = currentStepIndex > idx && timerRunning;
                  const targetGrams = step.waterTargetGrams(coffeeDose);

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-[#F8F5EE] border-[#B86B3E] shadow-sm translate-x-1'
                          : isPast
                          ? 'bg-[#EAE2D3]/60 border-transparent opacity-70'
                          : 'bg-[#F8F5EE]/60 border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-[#827163]">
                            {step.time}
                          </span>
                          <span className="font-serif font-medium text-sm text-[#1E1714]">
                            {step.title}
                          </span>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#B86B3E] font-bold uppercase tracking-wider animate-pulse">
                              <Sparkles className="w-3 h-3" /> Active Pour
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs font-bold tabular-nums text-[#1E1714]">
                          {targetGrams}g
                        </span>
                      </div>
                      <p className="text-xs text-[#594C42] leading-relaxed">
                        {step.instruction}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 bg-[#EAE2D3] rounded-lg text-xs text-[#706054] flex items-center gap-2">
              <span className="font-semibold text-[#1E1714]">Barista Note:</span>
              <span>Water quality matters. Use mineral water TDS 75–125 ppm for optimal sweetness extraction.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
