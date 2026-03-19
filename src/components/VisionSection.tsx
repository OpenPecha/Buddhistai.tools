"use client";
import { Users, MessageCircle, ThumbsUp } from "lucide-react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import type { Testimonial } from "@/components/ui/circular-testimonials";

const visionPosts: Array<{
  title: string;
  author: string;
  role: string;
  avatar: string;
  description: string;
}> = [
  {
    title: "Our Mission",
    author: "Tenzin Tsering",
    role: "Software Engineer",
    avatar: "https://dharmaduta.in/team/pecha_server/tentse.png",
    description:
      "Our mission is to preserve and make accessible the profound wisdom of Buddhist teachings through innovative digital technologies. We're ensuring ancient knowledge remains relevant for future generations.",
  },
  {
    title: "Our Values",
    author: "Karma Tsering",
    role: "Software Engineer",
    avatar: "https://dharmaduta.in/team/pecha_studio/kartse.jpg",
    description:
      "We are guided by compassion, mindfulness, and the pursuit of wisdom. Every tool we create is designed with respect for the sacred nature of these texts and their transformative power.",
  },
  {
    title: "Our Vision",
    author: "Tashi Tsering",
    role: "AI Engineer",
    avatar: "https://dharmaduta.in/team/pecha_server/tatse.jpg",
    description:
      "We combine cutting-edge technology with traditional scholarship, ensuring our tools honor the depth and nuance of Buddhist teachings while embracing modern learning methods.",
  },
  {
    title: "Our Approach",
    author: "Tenzin Kunsang",
    role: "DevOps Engineer",
    avatar: "https://dharmaduta.in/team/pecha_studio/tenkus.jpg",
    description:
      "Envisioning a world where Buddhist wisdom is freely accessible to all seekers, transcending geographical, linguistic, and technological barriers through thoughtfully crafted digital tools.",
  },
];

const visionTestimonials: Testimonial[] = visionPosts.map((p) => ({
  quote: p.description,
  name: p.author,
  designation: p.role,
  src: p.avatar,
}));

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="py-16 md:py-24 relative overflow-hidden"
      aria-labelledby="vision-heading"
    >
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl bg-[var(--primary)]/10 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl bg-[var(--secondary)]/10 pointer-events-none" aria-hidden />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <header className="text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] mb-5">
            <MessageCircle className="h-4 w-4 text-[var(--primary)]" />
            Community Voices
          </div>
          <h2
            id="vision-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl text-[var(--foreground)] mb-3"
          >
            What Our Team Says
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            From our founders and team on mission, values, and vision.
          </p>
        </header>

        <div className="flex flex-wrap items-center justify-center relative max-w-[1456px] mx-auto">
          <CircularTestimonials
            testimonials={visionTestimonials}
            autoplay={true}
            colors={{
              name: "var(--foreground)",
              designation: "var(--muted-foreground)",
              testimony: "var(--foreground)",
              arrowBackground: "var(--primary)",
              arrowForeground: "var(--primary-foreground)",
              arrowHoverBackground: "var(--primary)",
            }}
            fontSizes={{
              name: "1.75rem",
              designation: "0.925rem",
              quote: "1.125rem",
            }}
          />
        </div>

        <aside className="mt-12 md:mt-14" aria-labelledby="community-stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-3 text-[var(--primary)]">
                <ThumbsUp className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-[var(--foreground)] mb-1">2.4K+</div>
              <div className="text-sm text-[var(--muted-foreground)]">Community Likes</div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-3 text-[var(--primary)]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-[var(--foreground)] mb-1">589</div>
              <div className="text-sm text-[var(--muted-foreground)]">Active Discussions</div>
            </div>
            <a
              href="https://forum.openpecha.org"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm p-6 text-center shadow-sm hover:shadow-md hover:border-[var(--primary)]/30 transition-all duration-300 block"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-3 text-[var(--primary)]">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium text-[var(--foreground)]">Join Discussion</div>
              <div className="text-xs text-[var(--muted-foreground)] mt-1">Connect with our team</div>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default VisionSection;

