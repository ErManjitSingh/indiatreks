"use client";

import { useState } from "react";

import { submitBookingEnquiryAction } from "@/actions";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useUiStore } from "@/lib/store";

export function EnquireModal() {
  const { enquireModalOpen, setEnquireModalOpen } = useUiStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    travelers: "2",
    notes: "",
  });

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await submitBookingEnquiryAction({
      trekSlug: "general-enquiry",
      name: form.name,
      email: form.email,
      phone: form.phone,
      travelers: Number(form.travelers),
      preferredDate: form.preferredDate || new Date().toISOString().slice(0, 10),
      notes: form.notes,
    });
    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setEnquireModalOpen(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      travelers: "2",
      notes: "",
    });
  };

  return (
    <Modal open={enquireModalOpen} onOpenChange={setEnquireModalOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Enquire about a trek</ModalTitle>
          <ModalDescription>
            Share a few details and our trek specialist will get back to you shortly.
          </ModalDescription>
        </ModalHeader>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input
            label="Full name"
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <Input
            label="Phone"
            type="tel"
            required
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              label="Preferred date"
              type="date"
              value={form.preferredDate}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, preferredDate: event.target.value }))
              }
            />
            <Input
              label="Travelers"
              type="number"
              min={1}
              max={20}
              value={form.travelers}
              onChange={(event) => setForm((prev) => ({ ...prev, travelers: event.target.value }))}
            />
          </div>
          <Textarea
            label="Notes"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            placeholder="Tell us which trek you’re interested in…"
          />
          <ModalFooter>
            <Button type="button" variant="outline" onClick={() => setEnquireModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" loading={loading}>
              Send enquiry
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
