"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import type { TestimonialColumnItem } from "@/components/ui/testimonials-columns-1";

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

const visionTestimonials: TestimonialColumnItem[] = visionPosts.map((p) => ({
  text: p.description,
  image: p.avatar,
  name: p.author,
  role: p.role,
}));

// Cycle through 4 items to fill 3 columns of 3 for seamless scrolling
const firstColumn = [
  visionTestimonials[0],
  visionTestimonials[1],
  visionTestimonials[2],
];
const secondColumn = [
  visionTestimonials[3],
  visionTestimonials[0],
  visionTestimonials[1],
];
const thirdColumn = [
  visionTestimonials[2],
  visionTestimonials[3],
  visionTestimonials[0],
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="py-16 md:py-24 relative overflow-hidden bg-[var(--background)]"
      aria-labelledby="vision-heading"
    >
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl bg-[var(--primary)]/10 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl bg-[var(--secondary)]/10 pointer-events-none"
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12 md:mb-14"
        >
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
          <p className="text-[var(--muted-foreground)] text-lg text-center">
            From our founders and team on mission, values, and vision.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
