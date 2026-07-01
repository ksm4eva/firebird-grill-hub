import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import heroImg from "@/assets/diamond/hero.jpg";
import apt1 from "@/assets/diamond/apt-1.jpg";
import apt2 from "@/assets/diamond/apt-2.jpg";
import apt3 from "@/assets/diamond/apt-3.jpg";
import poolImg from "@/assets/diamond/pool.jpg";
import gardenImg from "@/assets/diamond/garden.jpg";
import gymImg from "@/assets/diamond/gym.jpg";

export const diamondImages = {
  hero: heroImg,
  apt1, apt2, apt3,
  pool: poolImg,
  garden: gardenImg,
  gym: gymImg,
};

export type Apartment = {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  available: boolean;
  featured: boolean;
  image: string;
  description: string;
};

export type Amenity = {
  id: string;
  title: string;
  icon: string; // lucide icon name
  description: string;
};

export type GalleryImage = { id: string; url: string; caption: string };

export type Testimonial = { id: string; name: string; role: string; quote: string };

export type Stat = { id: string; value: string; label: string };

export type SiteContent = {
  brandName: string;
  tagline: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutHeadline: string;
  aboutBody: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactWhatsapp: string;
  mapEmbedUrl: string;
  instagramUrl: string;
  facebookUrl: string;
};

export type TourBooking = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  apartment: string;
  message: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
};

export type DiamondState = {
  apartments: Apartment[];
  amenities: Amenity[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  stats: Stat[];
  content: SiteContent;
  bookings: TourBooking[];
};

const seedApartments: Apartment[] = [
  { id: "a1", name: "The Azure Suite", bedrooms: 1, bathrooms: 1, sqft: 780, price: 4200, available: true, featured: true, image: apt1, description: "Floor-to-ceiling glass overlooking the crystal pool. A serene one-bedroom retreat." },
  { id: "a2", name: "Palm Residence", bedrooms: 2, bathrooms: 2, sqft: 1240, price: 6800, available: true, featured: true, image: apt2, description: "Warm wood interiors, private garden terrace, and dual master suites." },
  { id: "a3", name: "The Ember Penthouse", bedrooms: 3, bathrooms: 3, sqft: 2100, price: 12500, available: true, featured: true, image: apt3, description: "Panoramic city view, private plunge pool, chef's kitchen, and expansive terrace." },
  { id: "a4", name: "Garden Loft", bedrooms: 2, bathrooms: 2, sqft: 1080, price: 5900, available: false, featured: false, image: gardenImg, description: "Ground-floor loft opening directly to the landscaped tropical gardens." },
  { id: "a5", name: "Poolside Studio", bedrooms: 0, bathrooms: 1, sqft: 520, price: 2900, available: true, featured: false, image: poolImg, description: "A minimalist studio steps from the pool deck. Perfect for pied-à-terre living." },
];

const seedAmenities: Amenity[] = [
  { id: "am1", title: "Infinity Pool", icon: "Waves", description: "Crystal-clear turquoise pool with poolside cabanas." },
  { id: "am2", title: "State-of-the-Art Gym", icon: "Dumbbell", description: "Panoramic garden views. Open 24/7 for residents." },
  { id: "am3", title: "Kids Playground", icon: "Baby", description: "Safe, shaded play area with modern equipment." },
  { id: "am4", title: "Private Parking", icon: "Car", description: "Underground secured parking with EV charging." },
  { id: "am5", title: "24/7 Security", icon: "Shield", description: "Concierge, biometric access, and CCTV monitoring." },
  { id: "am6", title: "Landscaped Gardens", icon: "TreePalm", description: "Manicured tropical grounds designed by leading landscape architects." },
  { id: "am7", title: "High-Speed Internet", icon: "Wifi", description: "Fiber-optic connectivity in every residence." },
  { id: "am8", title: "Backup Power", icon: "Zap", description: "100% power backup, always on, always ready." },
];

const seedGallery: GalleryImage[] = [
  { id: "g1", url: heroImg, caption: "Poolside sunset" },
  { id: "g2", url: apt1, caption: "Azure suite living" },
  { id: "g3", url: apt2, caption: "Palm residence bedroom" },
  { id: "g4", url: poolImg, caption: "Infinity pool aerial" },
  { id: "g5", url: gardenImg, caption: "Garden pathway" },
  { id: "g6", url: apt3, caption: "Penthouse kitchen" },
  { id: "g7", url: gymImg, caption: "Wellness center" },
];

const seedTestimonials: Testimonial[] = [
  { id: "t1", name: "Amelia Osei", role: "Resident, Palm Residence", quote: "Moving into Diamond City felt like waking up on holiday every day. The service, the light, the water — it's unmatched." },
  { id: "t2", name: "Kwame Mensah", role: "Resident, Ember Penthouse", quote: "This isn't an apartment. It's a piece of architecture I get to live inside. The attention to detail is extraordinary." },
  { id: "t3", name: "Sofia Adjei", role: "Resident, Azure Suite", quote: "Every morning I open the curtains and see the palms reflected in the pool. Diamond City redefined what home means to me." },
];

const seedStats: Stat[] = [
  { id: "s1", value: "200+", label: "Luxury Residences" },
  { id: "s2", value: "5★", label: "Resident Experience" },
  { id: "s3", value: "24/7", label: "Security & Concierge" },
  { id: "s4", value: "100%", label: "Power Backup" },
];

const seedContent: SiteContent = {
  brandName: "DIAMOND CITY",
  tagline: "Luxury Living Beyond Expectations",
  heroEyebrow: "PRIVATE RESIDENCES · GHANA",
  heroTitle: "Luxury Living\nBeyond Expectations",
  heroSubtitle: "Experience elegant apartment living surrounded by breathtaking architecture, crystal-clear pools, lush gardens, and world-class amenities.",
  aboutHeadline: "An architecture of stillness.",
  aboutBody: "Diamond City is designed for those who understand that luxury is not ornament — it is space, light, and the quiet confidence of every material chosen with intention. Set within landscaped tropical gardens and framed by a mirror-still infinity pool, our residences bring the poetry of Aman and the precision of Apple to private living in Ghana.",
  contactPhone: "+233 20 000 0000",
  contactEmail: "residences@diamondcity.gh",
  contactAddress: "Airport Residential Area, Accra, Ghana",
  contactWhatsapp: "+233200000000",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.516!2d-0.174!3d5.605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTguMCJOIDDCsDEwJzI2LjQiVw!5e0!3m2!1sen!2sgh!4v1700000000000",
  instagramUrl: "https://instagram.com/diamondcity",
  facebookUrl: "https://facebook.com/diamondcity",
};

const SEED: DiamondState = {
  apartments: seedApartments,
  amenities: seedAmenities,
  gallery: seedGallery,
  testimonials: seedTestimonials,
  stats: seedStats,
  content: seedContent,
  bookings: [],
};

const STORAGE_KEY = "diamond_admin_state_v1";
const PWD_KEY = "diamond_admin_password";
const SESSION_KEY = "diamond_admin_session";
const DEFAULT_PWD = "diamond2026";

export function getDiamondPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PWD;
  return localStorage.getItem(PWD_KEY) ?? DEFAULT_PWD;
}
export function setDiamondPassword(pwd: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PWD_KEY, pwd);
}
export function isDiamondLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "1";
}
export function diamondLogin(pwd: string): boolean {
  if (pwd !== getDiamondPassword()) return false;
  localStorage.setItem(SESSION_KEY, "1");
  return true;
}
export function diamondLogout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

type Ctx = {
  state: DiamondState;
  setState: (updater: (prev: DiamondState) => DiamondState) => void;
  reset: () => void;
};

const DiamondContext = createContext<Ctx | null>(null);

export function DiamondProvider({ children }: { children: ReactNode }) {
  const [state, setStateInner] = useState<DiamondState>(SEED);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DiamondState>;
        setStateInner({ ...SEED, ...parsed });
      }
    } catch {}
  }, []);

  const setState = useCallback((updater: (prev: DiamondState) => DiamondState) => {
    setStateInner((prev) => {
      const next = updater(prev);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setStateInner(SEED);
  }, []);

  return <DiamondContext.Provider value={{ state, setState, reset }}>{children}</DiamondContext.Provider>;
}

export function useDiamond(): Ctx {
  const ctx = useContext(DiamondContext);
  if (!ctx) throw new Error("useDiamond must be used inside DiamondProvider");
  return ctx;
}

export function dcUid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatUsd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
