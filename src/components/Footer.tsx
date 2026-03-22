"use client";

import {
  Wrench,
  Eye,
  BookOpen,
  Globe,
  Users,
  Sparkles,
  Scale,
  FileText,
} from "lucide-react";
import { Footer as FooterUI } from "@/components/ui/footer";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer
      className={`border-t border-border bg-surface-elevated py-12 ${className}`}
      role="contentinfo"
    >
      <FooterUI
        className="pt-8"
        brand={{
          name: "WeBuddhist AI Studio",
          description:
            "Preserving and sharing the wisdom of Buddhist teachings through AI-powered digital tools.",
          href: "/",
        }}
        socialLinks={[
          { name: "Forum", href: "https://forum.openpecha.org" },
          { name: "OpenPecha", href: "https://openpecha.org" },
        ]}
        columns={[
          {
            title: "Quick Links",
            links: [
              { name: "AI Tools", Icon: Wrench, href: "#tools" },
              { name: "Vision", Icon: Eye, href: "#vision" },
              {
                name: "Forum",
                Icon: BookOpen,
                href: "https://forum.openpecha.org",
              },
            ],
          },
          {
            title: "Our Mission",
            links: [
              {
                name: "Global Access",
                Icon: Globe,
                href: "#vision",
              },
              {
                name: "Community",
                Icon: Users,
                href: "https://forum.openpecha.org",
              },
              {
                name: "AI Innovation",
                Icon: Sparkles,
                href: "#tools",
              },
            ],
          },
          {
            title: "Legal",
            links: [
              { name: "Privacy Policy", Icon: Scale, href: "#" },
              { name: "Terms of Service", Icon: FileText, href: "#" },
            ],
          },
        ]}
        copyright="© 2025 WeBuddhist AI Studio. Some tools use AI to enhance manuscript processing and analysis."
      />
    </footer>
  );
};

export default Footer;
