"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Terminal,
  Gauge,
  BookOpen,
  Cloud,
  Route,
  HelpCircle,
  Zap,
  Heart,
} from "lucide-react";

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const defaultFeatures: FeatureItem[] = [
  {
    title: "Built for scholars",
    description:
      "Designed for researchers, translators, annotators, and students of Buddhist studies.",
    icon: <Terminal className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "Ease of use",
    description:
      "Intuitive interfaces that make complex manuscript work accessible to everyone.",
    icon: <Gauge className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "Open access",
    description:
      "Free tools for the community. No paywalls, no lock-in, just knowledge sharing.",
    icon: <BookOpen className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "Reliable infrastructure",
    description: "Hosted on stable, scalable systems so your work is always available.",
    icon: <Cloud className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "Collaborative workflows",
    description: "Share and iterate on annotations and translations with your team.",
    icon: <Route className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "Support when you need it",
    description:
      "Community support and documentation to help you get the most from our tools.",
    icon: <HelpCircle className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "AI-powered assistance",
    description:
      "Modern AI augments your scholarship without replacing human expertise.",
    icon: <Zap className="h-8 w-8 text-[var(--primary)]" />,
  },
  {
    title: "Rooted in tradition",
    description:
      "Technology that honors the sacred nature and depth of Buddhist texts.",
    icon: <Heart className="h-8 w-8 text-[var(--primary)]" />,
  },
];

interface FeaturesSectionWithHoverEffectsProps {
  features?: FeatureItem[];
  className?: string;
}

export function FeaturesSectionWithHoverEffects({
  features = defaultFeatures,
  className,
}: FeaturesSectionWithHoverEffectsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto px-4",
        className
      )}
    >
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-[var(--border)]",
        (index === 0 || index === 4) && "lg:border-l border-[var(--border)]",
        index < 4 && "lg:border-b border-[var(--border)]"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[var(--muted)]/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[var(--muted)]/50 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[var(--muted-foreground)]">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[var(--muted)] group-hover/feature:bg-[var(--primary)] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[var(--foreground)]">
          {title}
        </span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
