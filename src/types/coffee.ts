export type CoffeeCategory = 'all' | 'espresso' | 'filter' | 'signature' | 'bakery' | 'beans';

export type CupSize = 'cortado' | 'flat-white' | 'standard' | 'large';
export type MilkChoice = 'whole' | 'oat' | 'almond' | 'pistachio' | 'none';
export type TemperatureChoice = 'hot' | 'iced';
export type BeanOriginChoice = 'house-blend' | 'ethiopia-yirgacheffe' | 'colombia-geisha' | 'decaf-sugarcane';
export type GrindChoice = 'whole-bean' | 'espresso' | 'aeropress' | 'pour-over' | 'french-press';

export interface MenuItem {
  id: string;
  name: string;
  japaneseSubtitle?: string;
  category: CoffeeCategory;
  price: number;
  description: string;
  origin?: string;
  tastingNotes: string[];
  roastLevel?: 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark';
  elevation?: string;
  process?: string;
  image: string;
  isSeasonal?: boolean;
  isSignature?: boolean;
  dietary?: string[];
  customizable?: boolean;
  isBeanBag?: boolean;
}

export interface CartCustomization {
  size?: CupSize;
  milk?: MilkChoice;
  temp?: TemperatureChoice;
  bean?: BeanOriginChoice;
  grind?: GrindChoice;
  sweetness?: '0%' | '25%' | '50%' | '100%';
  extraShot?: boolean;
  bagWeight?: '250g' | '1kg';
}

export interface CartItem {
  id: string; // unique cart instance id
  menuItemId: string;
  item: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  itemPrice: number;
}

export type BrewMethod = 'v60' | 'chemex' | 'aeropress' | 'french-press' | 'kalita';

export interface BrewGuide {
  id: BrewMethod;
  name: string;
  device: string;
  ratio: number; // e.g. 15 for 1:15
  defaultDose: number; // in grams
  tempC: number;
  grindName: string;
  grindMicrons: string;
  totalTimeSeconds: number;
  steps: {
    time: string;
    secondStart: number;
    title: string;
    instruction: string;
    waterTargetGrams: (dose: number) => number;
  }[];
}

export interface TableReservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  zone: 'window' | 'leather-lounge' | 'communal-oak' | 'courtyard';
  notes?: string;
}
