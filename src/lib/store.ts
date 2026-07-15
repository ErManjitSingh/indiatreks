import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  mobileMenuOpen: boolean;
  bookingDrawerOpen: boolean;
  searchOpen: boolean;
  trekFiltersOpen: boolean;
  trekSortOpen: boolean;
  trekPreviewId: string | null;
  trekCompareOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setBookingDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setTrekFiltersOpen: (open: boolean) => void;
  setTrekSortOpen: (open: boolean) => void;
  setTrekPreviewId: (id: string | null) => void;
  setTrekCompareOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  bookingDrawerOpen: false,
  searchOpen: false,
  trekFiltersOpen: false,
  trekSortOpen: false,
  trekPreviewId: null,
  trekCompareOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setBookingDrawerOpen: (open) => set({ bookingDrawerOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setTrekFiltersOpen: (open) => set({ trekFiltersOpen: open }),
  setTrekSortOpen: (open) => set({ trekSortOpen: open }),
  setTrekPreviewId: (id) => set({ trekPreviewId: id }),
  setTrekCompareOpen: (open) => set({ trekCompareOpen: open }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));

interface WishlistState {
  trekIds: string[];
  toggle: (trekId: string) => void;
  has: (trekId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      trekIds: [],
      toggle: (trekId) =>
        set((state) => ({
          trekIds: state.trekIds.includes(trekId)
            ? state.trekIds.filter((id) => id !== trekId)
            : [...state.trekIds, trekId],
        })),
      has: (trekId) => get().trekIds.includes(trekId),
      clear: () => set({ trekIds: [] }),
    }),
    {
      name: "ihd-wishlist",
      // Prevent localStorage from overwriting state before hydration completes (Next.js SSR).
      skipHydration: true,
    },
  ),
);

interface CompareState {
  trekIds: string[];
  toggle: (trekId: string) => void;
  has: (trekId: string) => boolean;
  clear: () => void;
  remove: (trekId: string) => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      trekIds: [],
      toggle: (trekId) =>
        set((state) => {
          if (state.trekIds.includes(trekId)) {
            return { trekIds: state.trekIds.filter((id) => id !== trekId) };
          }
          if (state.trekIds.length >= 3) return state;
          return { trekIds: [...state.trekIds, trekId] };
        }),
      has: (trekId) => get().trekIds.includes(trekId),
      clear: () => set({ trekIds: [] }),
      remove: (trekId) =>
        set((state) => ({ trekIds: state.trekIds.filter((id) => id !== trekId) })),
    }),
    {
      name: "ihd-compare",
      skipHydration: true,
    },
  ),
);

interface RecentlyViewedState {
  trekIds: string[];
  add: (trekId: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      trekIds: [],
      add: (trekId) =>
        set((state) => ({
          trekIds: [trekId, ...state.trekIds.filter((id) => id !== trekId)].slice(0, 8),
        })),
      clear: () => set({ trekIds: [] }),
    }),
    {
      name: "ihd-recently-viewed",
      skipHydration: true,
    },
  ),
);
