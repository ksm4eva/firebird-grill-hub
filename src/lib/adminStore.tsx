import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import heroBurger from "@/assets/hero-burger.jpg";
import wings from "@/assets/wings.jpg";
import menuChicken from "@/assets/menu-chicken.jpg";
import menuBowl from "@/assets/menu-bowl.jpg";
import menuMocktail from "@/assets/menu-mocktail.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryGrill from "@/assets/gallery-grill.jpg";
import galleryFries from "@/assets/gallery-fries.jpg";
import galleryDessert from "@/assets/gallery-dessert.jpg";

/* ------------------------- Types ------------------------- */

export type MenuItem = {
  id: string;
  sectionId: string;
  name: string;
  desc: string;
  price: number;
  img?: string;
  tag?: string;
  veg?: boolean;
  available: boolean;
  featured: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  tagline: string;
};

export type Location = {
  id: string;
  city: string;
  region: string;
  addr: string;
  phone: string;
  hours: string;
  flagship?: boolean;
};

export type DayHours = { day: string; open: string; close: string; closed?: boolean };
export type CityVariant = { id: string; city: string; note: string };

export type LoyaltyTier = {
  id: string;
  name: string;
  req: string;
  perks: string[];
  popular?: boolean;
};

export type LoyaltyReward = { id: string; cost: number; item: string };

export type TimelineEntry = { id: string; year: string; title: string; text: string };

export type GalleryShot = {
  id: string;
  src: string;
  label: string;
  span?: "" | "lg:row-span-2" | "lg:col-span-2";
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  featured: boolean;
};

export type CustomerComment = {
  id: string;
  createdAt: string;
  name: string;
  location: string;
  rating: number;
  message: string;
  status: "pending" | "approved" | "rejected";
  featured: boolean;
};

export type SiteContent = {
  hero: { eyebrow: string; titleLine1: string; titleLine2: string; titleAccent: string; subtitle: string };
  about: { headline: string; body: string; bullets: string[] };
  story: { intro: string; origin: string };
  timeline: TimelineEntry[];
  values: { id: string; title: string; text: string }[];
  menuHighlights: { eyebrow: string; titleLine1: string; titleLine2: string };
  gallery: { eyebrow: string; titleLine1: string; titleLine2: string };
  reviews: { eyebrow: string; titleLine1: string; titleLine2: string };
};

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string };
  mode: "pickup" | "delivery";
  payment: "cash" | "card" | "mtn-momo" | "vodafone-cash" | "airteltigo-money";
  address?: string;
  items: { id: string; name: string; price: number; qty: number }[];
  subtotal: number;
  fee: number;
  tax: number;
  total: number;
  status: "new" | "preparing" | "ready" | "completed" | "cancelled";
};

export type Reservation = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
};

export type CateringInquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  guests: number;
  packageType: string;
  notes?: string;
  status: "new" | "contacted" | "booked" | "closed";
};

export type Settings = {
  currency: string;
  currencySymbol: string;
  taxRate: number;
  deliveryFee: number;
  paymentMethods: { id: Order["payment"]; label: string; enabled: boolean }[];
  brandName: string;
  tagline: string;
  socialInstagram: string;
  socialFacebook: string;
  socialTwitter: string;
  footerBlurb: string;
};

export type AdminState = {
  menuSections: MenuSection[];
  menuItems: MenuItem[];
  locations: Location[];
  hours: DayHours[];
  cityVariants: CityVariant[];
  loyaltyTiers: LoyaltyTier[];
  loyaltyRewards: LoyaltyReward[];
  siteContent: SiteContent;
  gallery: GalleryShot[];
  testimonials: Testimonial[];
  comments: CustomerComment[];
  orders: Order[];
  reservations: Reservation[];
  cateringInquiries: CateringInquiry[];
  settings: Settings;
};

/* ------------------------- Seed (Ghana) ------------------------- */

const seedSections: MenuSection[] = [
  { id: "burgers", title: "Burgers", tagline: "Smashed. Charred. Stacked." },
  { id: "chicken", title: "Chicken", tagline: "24-hour brine. Pure crunch." },
  { id: "wings", title: "Wings", tagline: "Slow-smoked, glazed hot." },
  { id: "bowls", title: "Bowls & Greens", tagline: "Fresh, fired, balanced." },
  { id: "sides", title: "Sides", tagline: "Built for sharing." },
  { id: "drinks", title: "Drinks & Mocktails", tagline: "Cool down the heat." },
  { id: "dessert", title: "Sweet Heat", tagline: "Finish strong." },
];

const seedItems: MenuItem[] = [
  { id: "fb-burger", sectionId: "burgers", name: "Firebird Burger", desc: "Double smash beef, aged cheddar, charred onion, signature flame sauce, brioche.", price: 85, img: heroBurger, tag: "Signature", available: true, featured: true },
  { id: "inferno", sectionId: "burgers", name: "Inferno Double", desc: "Two smash patties, pepper jack, jalapeños, ghost-pepper aioli, crispy onion.", price: 95, img: heroBurger, tag: "Spicy", available: true, featured: false },
  { id: "classic", sectionId: "burgers", name: "Classic Smash", desc: "Single smash patty, cheese, pickles, special sauce, soft brioche.", price: 65, available: true, featured: false },
  { id: "garden", sectionId: "burgers", name: "Garden Smash", desc: "House black bean patty, smoked gouda, avocado, chipotle mayo.", price: 75, veg: true, available: true, featured: false },
  { id: "crispy", sectionId: "chicken", name: "Crispy Heat Chicken", desc: "Buttermilk brined chicken, crisped golden, pickles, spicy aioli, brioche.", price: 70, img: menuChicken, tag: "Spicy", available: true, featured: true },
  { id: "honey-bird", sectionId: "chicken", name: "Honey Bird", desc: "Crispy chicken drizzled in hot honey, pickles, brioche.", price: 72, img: menuChicken, available: true, featured: false },
  { id: "tenders", sectionId: "chicken", name: "Tender Box (4)", desc: "Hand-breaded tenders with two sauces.", price: 65, available: true, featured: false },
  { id: "smoky", sectionId: "wings", name: "Smoky Wings (6)", desc: "Slow-smoked, tossed in honey-buffalo glaze.", price: 75, img: wings, tag: "Fan favorite", available: true, featured: true },
  { id: "flame-w", sectionId: "wings", name: "Flame Wings (10)", desc: "Cayenne, smoked paprika, garlic glaze.", price: 110, img: wings, available: true, featured: false },
  { id: "suya-wings", sectionId: "wings", name: "Suya Wings (10)", desc: "Tossed in our house suya spice — peanut, ginger, chili.", price: 115, img: wings, tag: "Ghana", available: true, featured: true },
  { id: "bowl", sectionId: "bowls", name: "Firebird Bowl", desc: "Grilled chicken, charred corn, jollof rice, avocado, chipotle drizzle.", price: 90, img: menuBowl, tag: "Fresh", available: true, featured: true },
  { id: "harvest", sectionId: "bowls", name: "Harvest Grain", desc: "Quinoa, roasted veg, kale, tahini-lemon, pickled onion.", price: 80, veg: true, available: true, featured: false },
  { id: "fries", sectionId: "sides", name: "Waffle Fries", desc: "Crispy waffle-cut, sea salt.", price: 25, img: galleryFries, available: true, featured: false },
  { id: "truffle", sectionId: "sides", name: "Truffle Parm Fries", desc: "Shoestring, truffle oil, parm, chives.", price: 40, img: galleryFries, available: true, featured: false },
  { id: "plantain", sectionId: "sides", name: "Charred Plantain", desc: "Ripe plantain, flame-charred, suya dust.", price: 22, tag: "Ghana", veg: true, available: true, featured: true },
  { id: "blaze", sectionId: "drinks", name: "Blaze Mocktail", desc: "Mango, lime, chili, ginger beer.", price: 28, img: menuMocktail, available: true, featured: true },
  { id: "sobolo", sectionId: "drinks", name: "Sobolo Spritz", desc: "Hibiscus, ginger, pineapple, soda.", price: 22, img: menuMocktail, tag: "Ghana", available: true, featured: true },
  { id: "lemonade", sectionId: "drinks", name: "House Lemonade", desc: "Fresh-pressed, real lemon.", price: 18, available: true, featured: false },
  { id: "sundae", sectionId: "dessert", name: "Charred Banana Sundae", desc: "Grilled banana, vanilla, salted caramel, honeycomb.", price: 45, img: galleryDessert, available: true, featured: false },
  { id: "cookie", sectionId: "dessert", name: "Brown Butter Cookie", desc: "Warm, salted, gooey center.", price: 18, available: true, featured: false },
];

const seedLocations: Location[] = [
  { id: "osu", city: "Accra", region: "Osu", addr: "18 Oxford Street, Osu, Accra", phone: "+233 20 555 0142", hours: "11am – 11pm Daily", flagship: true },
  { id: "east-legon", city: "Accra", region: "East Legon", addr: "A&C Mall, Lagos Avenue, East Legon", phone: "+233 24 555 0188", hours: "11am – 12am Daily" },
  { id: "airport", city: "Accra", region: "Airport City", addr: "Marina Mall, Airport City", phone: "+233 55 555 0177", hours: "10am – 11pm Daily" },
  { id: "tema", city: "Tema", region: "Community 1", addr: "Tema Community 1 Roundabout", phone: "+233 50 555 0133", hours: "11am – 10pm Daily" },
  { id: "kumasi", city: "Kumasi", region: "Asokwa", addr: "Kumasi City Mall, Asokwa", phone: "+233 27 555 0166", hours: "11am – 10pm Daily", flagship: true },
  { id: "takoradi", city: "Takoradi", region: "Market Circle", addr: "Market Circle, Takoradi", phone: "+233 26 555 0151", hours: "11am – 10pm Daily" },
  { id: "cape-coast", city: "Cape Coast", region: "Downtown", addr: "Commercial Street, Cape Coast", phone: "+233 24 555 0199", hours: "11am – 10pm Daily" },
  { id: "tamale", city: "Tamale", region: "Central", addr: "Hospital Road, Tamale", phone: "+233 20 555 0122", hours: "11am – 10pm Daily" },
];

const seedHours: DayHours[] = [
  { day: "Monday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Tuesday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Wednesday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Thursday", open: "11:00 AM", close: "11:00 PM" },
  { day: "Friday", open: "11:00 AM", close: "1:00 AM" },
  { day: "Saturday", open: "10:00 AM", close: "1:00 AM" },
  { day: "Sunday", open: "10:00 AM", close: "10:00 PM" },
];

const seedCityVariants: CityVariant[] = [
  { id: "v1", city: "Accra — Osu", note: "Late kitchen Fri–Sat until 1am" },
  { id: "v2", city: "Accra — East Legon", note: "Open until 12am every night" },
  { id: "v3", city: "Kumasi — Asokwa", note: "Brunch menu Sat–Sun until 2pm" },
  { id: "v4", city: "Tema — Community 1", note: "Closed Sunday mornings until 12pm" },
];

const seedTiers: LoyaltyTier[] = [
  { id: "ember", name: "Ember", req: "0 flames", perks: ["1 flame per ₵10 spent", "Free birthday side", "Early menu drops"] },
  { id: "blaze", name: "Blaze", req: "500 flames", perks: ["1.25× flames per ₵10", "Free fries weekly", "Skip-the-line pickup", "Exclusive menu access"], popular: true },
  { id: "inferno", name: "Inferno", req: "2,000 flames", perks: ["1.5× flames per ₵10", "Free entrée monthly", "Members-only events", "Chef tasting invites", "VIP catering"] },
];

const seedRewards: LoyaltyReward[] = [
  { id: "r1", cost: 50, item: "Free side of fries" },
  { id: "r2", cost: 100, item: "Free sobolo spritz" },
  { id: "r3", cost: 200, item: "Free chicken sandwich" },
  { id: "r4", cost: 350, item: "Free Firebird Burger" },
  { id: "r5", cost: 500, item: "Free meal for two" },
];

const seedSiteContent: SiteContent = {
  hero: {
    eyebrow: "Flame-grilled since day one",
    titleLine1: "BOLD",
    titleAccent: "FLAVORS.",
    titleLine2: "FIRED UP.",
    subtitle: "Firebird brings the heat with flame-grilled burgers, crispy chicken, smoked wings, handcrafted sauces and unforgettable flavor — made fresh in Accra.",
  },
  about: {
    headline: "BORN FROM FIRE. RAISED ON FLAVOR.",
    body: "Firebird started in a single brick oven kitchen in Osu with one obsession — real flame, real flavor. Every burger is hand-pressed, every chicken is brined for 24 hours, every sauce is made in-house.",
    bullets: [
      "Locally sourced Ghanaian beef & poultry",
      "Brioche baked fresh daily",
      "Open-flame charcoal grill",
      "Zero artificial anything",
    ],
  },
  story: {
    intro: "Firebird isn't a chain that grew into a brand. It's a brand built around one stubborn idea: food tastes better with real flame behind it.",
    origin: "In 2014, our founder Ama had a busted charcoal grill, a butcher in Madina she trusted, and a hunch that fast food didn't have to taste fast. She started smashing burgers over open flame and brining chicken overnight in buttermilk and a spice blend she still hand-mixes today.",
  },
  timeline: [
    { id: "t1", year: "2014", title: "One charcoal grill", text: "Founder Ama opens a tiny grill kitchen in Osu, Accra with one obsession — real fire, real flavor." },
    { id: "t2", year: "2017", title: "The smash hit", text: "The Firebird Burger lands on Joy FM's food show. A line forms around the block and never really stops." },
    { id: "t3", year: "2020", title: "Flame goes regional", text: "Kumasi opens. A second open grill. Suya wings join the menu and become a cult favorite." },
    { id: "t4", year: "2023", title: "Coastal heat", text: "Takoradi and Cape Coast flagships debut with open-kitchen design and a full mocktail bar." },
    { id: "t5", year: "2026", title: "8 kitchens, one fire", text: "We've grown — but every kitchen still grinds its own suya spice and brines chicken for 24 hours." },
  ],
  values: [
    { id: "v1", title: "Real fire, always", text: "Every patty hits an open flame. Every bird gets char. No shortcuts, no convection cheats." },
    { id: "v2", title: "Whole, not processed", text: "Locally sourced beef and poultry from Ghanaian farms. Brioche baked daily. Zero artificial anything." },
    { id: "v3", title: "Made to order", text: "Nothing sits under a lamp. Your order fires the second you hit confirm." },
  ],
  menuHighlights: {
    eyebrow: "The Lineup",
    titleLine1: "MENU",
    titleLine2: "HIGHLIGHTS.",
  },
  gallery: {
    eyebrow: "Up Close",
    titleLine1: "STRAIGHT",
    titleLine2: "FROM THE GRILL.",
  },
  reviews: {
    eyebrow: "Word of Mouth",
    titleLine1: "WHAT OUR",
    titleLine2: "CUSTOMERS SAY.",
  },
};

const seedGallery: GalleryShot[] = [
  { id: "g1", src: heroBurger, label: "Signature Burger", span: "lg:row-span-2" },
  { id: "g2", src: galleryGrill, label: "Open Flame" },
  { id: "g3", src: wings, label: "Suya Wings" },
  { id: "g4", src: galleryInterior, label: "The Room", span: "lg:col-span-2" },
  { id: "g5", src: menuMocktail, label: "Sobolo Spritz" },
  { id: "g6", src: galleryFries, label: "Waffle Fries" },
  { id: "g7", src: galleryDessert, label: "Sweet Heat" },
];

const seedTestimonials: Testimonial[] = [
  { id: "tm1", name: "Kwame A.", role: "Osu, Accra", quote: "The Firebird Burger ruined every other burger for me. That char, that sauce — it's not normal fast food.", featured: true },
  { id: "tm2", name: "Akosua M.", role: "Kumasi", quote: "The suya wings are insanity. I've ordered four times this week and have zero regrets. Sauce game is unreal.", featured: true },
  { id: "tm3", name: "Yaw B.", role: "East Legon, Accra", quote: "Fast casual that feels like a chef's kitchen. The jollof bowl is fresh, the chicken is crispy perfection.", featured: true },
];

const seedSettings: Settings = {
  currency: "GHS",
  currencySymbol: "₵",
  taxRate: 0.15, // VAT + NHIL + GETFund approx
  deliveryFee: 15,
  paymentMethods: [
    { id: "cash", label: "Cash on Delivery", enabled: true },
    { id: "card", label: "Credit/Debit Card", enabled: true },
    { id: "mtn-momo", label: "MTN Mobile Money", enabled: true },
    { id: "vodafone-cash", label: "Telecel (Vodafone) Cash", enabled: true },
    { id: "airteltigo-money", label: "AirtelTigo Money", enabled: true },
  ],
  brandName: "FIREBIRD",
  tagline: "Bold Flavors. Fired Up.",
  socialInstagram: "https://instagram.com/firebirdgh",
  socialFacebook: "https://facebook.com/firebirdgh",
  socialTwitter: "https://twitter.com/firebirdgh",
  footerBlurb: "Flame-grilled burgers, crispy chicken & handcrafted sauces. Made bold, served hot — across Ghana.",
};

const SEED: AdminState = {
  menuSections: seedSections,
  menuItems: seedItems,
  locations: seedLocations,
  hours: seedHours,
  cityVariants: seedCityVariants,
  loyaltyTiers: seedTiers,
  loyaltyRewards: seedRewards,
  siteContent: seedSiteContent,
  orders: [],
  reservations: [],
  cateringInquiries: [],
  settings: seedSettings,
};

/* ------------------------- Store ------------------------- */

const STORAGE_KEY = "firebird_admin_state_v1";

type Ctx = {
  state: AdminState;
  setState: (updater: (prev: AdminState) => AdminState) => void;
  reset: () => void;
};

const AdminContext = createContext<Ctx | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setStateInner] = useState<AdminState>(SEED);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AdminState>;
        setStateInner({ ...SEED, ...parsed });
      }
    } catch {}
  }, []);

  const setState = useCallback((updater: (prev: AdminState) => AdminState) => {
    setStateInner((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setStateInner(SEED);
  }, []);

  return (
    <AdminContext.Provider value={{ state, setState, reset }}>{children}</AdminContext.Provider>
  );
}

export function useAdmin(): Ctx {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}
