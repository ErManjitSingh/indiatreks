"use client";

import { useEffect, useState } from "react";

import { submitExitOfferAction } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";
import { toast } from "@/components/ui/toast";

const SESSION_KEY = "ihd-exit-intent";

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 0) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
      document.removeEventListener("mouseout", onMouseLeave);
    };

    document.addEventListener("mouseout", onMouseLeave);
    return () => document.removeEventListener("mouseout", onMouseLeave);
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await submitExitOfferAction({ phone });
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setPhone("");
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent className="w-[min(92vw,24rem)] border-[#e8ece6] bg-[#F7F8F6]">
        <ModalHeader>
          <ModalTitle className="text-[#2D5A27]">Get Flat 10% OFF</ModalTitle>
          <ModalDescription>
            Enter your mobile number and lock in coupon{" "}
            <span className="font-semibold text-[#1A1A1A]">EXIT10</span> before you go.
          </ModalDescription>
        </ModalHeader>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            label="Mobile Number"
            name="exit-phone"
            type="tel"
            inputMode="numeric"
            required
            placeholder="10-digit mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <p className="text-xs text-[#6b7368]">
            Apply <strong>EXIT10</strong> at checkout for flat 10% off.
          </p>
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              No thanks
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Claim Offer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
