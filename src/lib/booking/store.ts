import { create } from "zustand";
import { persist } from "zustand/middleware";

import { emptyTraveller, type BookingDraft, type SavedBooking } from "@/lib/booking/types";

interface BookingUiState {
  sheetOpen: boolean;
  activeSlug: string | null;
  /** Enquiry first; advance unlocks full booking flow */
  stage: "enquiry" | "advance";
  departureDateHint: string | null;
  openSheet: (slug: string, options?: { departureDate?: string }) => void;
  closeSheet: () => void;
  setSheetOpen: (open: boolean) => void;
  startAdvanceBooking: () => void;
  resetStage: () => void;
}

export const useBookingUiStore = create<BookingUiState>((set) => ({
  sheetOpen: false,
  activeSlug: null,
  stage: "enquiry",
  departureDateHint: null,
  openSheet: (slug, options) =>
    set({
      sheetOpen: true,
      activeSlug: slug,
      stage: "enquiry",
      departureDateHint: options?.departureDate ?? null,
    }),
  closeSheet: () =>
    set({
      sheetOpen: false,
      activeSlug: null,
      stage: "enquiry",
      departureDateHint: null,
    }),
  setSheetOpen: (open) =>
    set(
      open
        ? { sheetOpen: true }
        : {
            sheetOpen: false,
            activeSlug: null,
            stage: "enquiry",
            departureDateHint: null,
          },
    ),
  startAdvanceBooking: () => set({ stage: "advance" }),
  resetStage: () => set({ stage: "enquiry" }),
}));

interface BookingDraftState {
  draft: BookingDraft | null;
  initDraft: (input: {
    trekSlug: string;
    trekTitle: string;
    departureId?: string;
    departureDate?: string;
  }) => void;
  patchDraft: (patch: Partial<BookingDraft>) => void;
  setStep: (step: BookingDraft["step"]) => void;
  clearDraft: () => void;
}

export const useBookingDraftStore = create<BookingDraftState>()(
  persist(
    (set, get) => ({
      draft: null,
      initDraft: ({ trekSlug, trekTitle, departureId = "", departureDate = "" }) =>
        set({
          draft: {
            trekSlug,
            trekTitle,
            departureId,
            departureDate,
            batchLabel: "Morning Batch (7:00 AM)",
            adults: 1,
            children: 0,
            privateGroup: false,
            traveller: emptyTraveller(),
            addonIds: [],
            couponCode: "",
            couponApplied: false,
            termsAccepted: false,
            paymentMethod: null,
            step: 0,
          },
        }),
      patchDraft: (patch) => {
        const current = get().draft;
        if (!current) return;
        set({ draft: { ...current, ...patch } });
      },
      setStep: (step) => {
        const current = get().draft;
        if (!current) return;
        set({ draft: { ...current, step } });
      },
      clearDraft: () => set({ draft: null }),
    }),
    { name: "ihd-booking-draft", skipHydration: true },
  ),
);

interface BookingsState {
  bookings: SavedBooking[];
  lastBookingId: string | null;
  addBooking: (booking: SavedBooking) => void;
  setLastBookingId: (id: string | null) => void;
  updateBooking: (id: string, patch: Partial<SavedBooking>) => void;
  cancelBooking: (id: string) => void;
}

export const useBookingsStore = create<BookingsState>()(
  persist(
    (set) => ({
      bookings: [],
      lastBookingId: null,
      addBooking: (booking) =>
        set((state) => ({
          bookings: [booking, ...state.bookings],
          lastBookingId: booking.id,
        })),
      setLastBookingId: (id) => set({ lastBookingId: id }),
      updateBooking: (id, patch) =>
        set((state) => ({
          bookings: state.bookings.map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        })),
      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((item) =>
            item.id === id
              ? { ...item, status: "cancelled", paymentStatus: "failed" }
              : item,
          ),
        })),
    }),
    { name: "ihd-bookings", skipHydration: true },
  ),
);

interface ProfileState {
  name: string;
  email: string;
  phone: string;
  city: string;
  emergencyContact: string;
  photoUrl: string;
  addresses: string[];
  savedTravellers: Array<{ name: string; age: string; phone: string }>;
  setProfile: (patch: Partial<ProfileState>) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      phone: "",
      city: "",
      emergencyContact: "",
      photoUrl: "",
      addresses: [],
      savedTravellers: [],
      setProfile: (patch) => set((state) => ({ ...state, ...patch })),
    }),
    { name: "ihd-profile", skipHydration: true },
  ),
);
