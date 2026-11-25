import React from "react";
import type { Metadata } from "next";
import { ContactEnquirySection } from "@/components/ContactEnquirySection";

export const metadata: Metadata = {
  title: "Contact & Visit",
  description:
    "Visit Aliveli Vasthralaya at 122-03/1, Ice Factory Road, Ratnagar Nagar, Guntur, Andhra Pradesh – 522006 or send an enquiry.",
};

export default function ContactPage() {
  return <ContactEnquirySection />;
}
