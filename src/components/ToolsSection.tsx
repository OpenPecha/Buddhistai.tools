'use client';

import React, { useMemo } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { TransformedTool, TransformedOldTool } from "@/types/Tools";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LoginNotRequiredList = ['Arena', 'PDF cropper'];

function getCtaLabel(loginRequired: boolean, status: string, isAuthenticated: boolean): string {
  if (status !== "Available") return "Coming Soon";
  if (!loginRequired) return "Access Tool";
  return isAuthenticated ? "Access Tool" : "Login to Access";
}

/** Icon component for BentoCard: shows tool icon image or Sparkles */
function createToolIcon(iconUrl: string) {
  return function ToolIcon({ className }: { className?: string }) {
    return iconUrl ? (
      <Image src={iconUrl} alt="" width={48} height={48} className={cn("h-12 w-12 object-contain", className)} />
    ) : (
      <Sparkles className={className} />
    );
  };
}

/** Subtle gradient background for bento cards */
const BentoCardBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/8 via-transparent to-[var(--secondary)]/5" />
);

interface ToolBentoCardProps {
  tool: TransformedTool;
  loginRequired: boolean;
}

function ToolBentoCard({ tool, loginRequired }: ToolBentoCardProps) {
  const authUser = useUser();
  const user = authUser?.user ?? null;
  const isAuthenticated = !!user;
  const isDisabled = tool.status !== "Available";
  const path = tool.path ?? "#";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (loginRequired) {
      e.preventDefault();
      window.location.href = isAuthenticated ? path : "/auth/login";
    }
  };

  const cta = getCtaLabel(loginRequired, tool.status, isAuthenticated);
  const Icon = useMemo(() => createToolIcon(tool.icon ?? ""), [tool.icon]);

  const ctaContent = isDisabled ? (
    <Button variant="ghost" size="sm" disabled>
      {cta}
    </Button>
  ) : (
    <Button variant="ghost" size="sm" asChild>
      <Link href={path} onClick={handleClick} className="inline-flex items-center gap-2">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <BentoCard
      name={tool.title}
      description={tool.description ?? ""}
      href={path}
      cta={cta}
      Icon={Icon}
      background={<BentoCardBackground />}
      className="col-span-1"
      ctaContent={ctaContent}
      disabled={isDisabled}
      badge={tool.status !== "Available" ? "Coming Soon" : undefined}
    />
  );
}

interface OldToolBentoCardProps {
  tool: TransformedOldTool;
  loginRequired: boolean;
}

function OldToolBentoCard({ tool, loginRequired }: OldToolBentoCardProps) {
  const authUser = useUser();
  const user = authUser?.user ?? null;
  const isAuthenticated = !!user;
  const router = useRouter();
  const path = `/tools/${encodeURIComponent(tool.title)}`;
  const isDisabled = false;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    router.push(path);
  };

  const cta = getCtaLabel(loginRequired, "Available", isAuthenticated);
  const Icon = useMemo(() => createToolIcon(tool.icon ?? ""), [tool.icon]);

  const ctaContent = (
    <Button variant="ghost" size="sm" asChild>
      <Link href={path} onClick={handleClick} className="inline-flex items-center gap-2">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <BentoCard
      name={tool.title}
      description={tool.description ?? ""}
      href={path}
      cta={cta}
      Icon={Icon}
      background={<BentoCardBackground />}
      className="col-span-1"
      ctaContent={ctaContent}
      disabled={isDisabled}
    />
  );
}

interface ToolsSectionProps {
  tools: TransformedTool[];
  oldTools: TransformedOldTool[];
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ tools, oldTools }) => {
  return (
    <section
      id="tools"
      className="py-16 md:py-24 text-[var(--foreground)]"
      aria-labelledby="tools-heading"
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <header className="text-center mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] mb-6">
            <Sparkles className="h-4 w-4 text-[var(--primary)]" />
            Our AI Tools
          </div>
          <h2
            id="tools-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[var(--foreground)] mb-3"
          >
            AI-Powered Tools for Buddhist Studies
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">
            Translation, annotation, and analysis tools for manuscripts and texts.
          </p>
        </header>

        {/* NEW TOOLS – Bento Grid */}
        {tools && tools.length > 0 && (
          <div className="mb-16">
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[22rem] gap-6">
              {tools.map((tool) => (
                <ToolBentoCard
                  key={tool.id ?? tool.title}
                  tool={tool}
                  loginRequired={!LoginNotRequiredList.includes(tool.title)}
                />
              ))}
            </BentoGrid>
          </div>
        )}

        {/* LEGACY TOOLS – Bento Grid */}
        {oldTools && oldTools.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-[var(--foreground)]">
                Training Data Tools
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-medium border border-[var(--border)]">
                For annotators only
              </span>
            </div>
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[22rem] gap-6">
              {oldTools.map((tool) => (
                <OldToolBentoCard
                  key={tool.id ?? tool.title}
                  tool={tool}
                  loginRequired={!LoginNotRequiredList.includes(tool.title)}
                />
              ))}
            </BentoGrid>
          </div>
        )}

        {/* EMPTY STATE */}
        {(!tools || tools.length === 0) && (!oldTools || oldTools.length === 0) && (
          <div className="text-center py-20">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm p-12 max-w-md mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-5 text-[var(--primary)]">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Coming Soon</h3>
              <p className="text-[var(--muted-foreground)]">Our tools are being prepared for launch.</p>
              <p className="text-sm text-[var(--muted-foreground)] mt-2">Check back later for updates.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolsSection;
