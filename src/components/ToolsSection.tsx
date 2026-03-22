'use client';

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TransformedTool, TransformedOldTool } from "@/types/Tools";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LoginNotRequiredList = ['Arena', 'PDF cropper'];

function getCtaLabel(loginRequired: boolean, status: string, isAuthenticated: boolean): string {
  if (status !== "Available") return "Coming Soon";
  if (!loginRequired) return "Access Tool";
  return isAuthenticated ? "Access Tool" : "Login to Access";
}

interface ToolCardProps {
  title: string;
  description: string;
  icon?: string;
  path: string;
  loginRequired: boolean;
  status: string;
  index: number;
  badge?: string;
}

function ToolCard({ title, description, icon, path, loginRequired, status, index, badge }: ToolCardProps) {
  const authUser = useUser();
  const isAuthenticated = !!authUser?.user;
  const router = useRouter();
  const isDisabled = status !== "Available";

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (loginRequired && !isAuthenticated) {
      e.preventDefault();
      router.push("/auth/login");
    }
  };

  const cta = getCtaLabel(loginRequired, status, isAuthenticated);
  const href = isDisabled ? "#" : loginRequired && !isAuthenticated ? "/auth/login" : path;

  const content = (
    <>
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[var(--muted)]/50 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[var(--muted)]/50 to-transparent pointer-events-none" />
      )}
      {badge && (
        <span className="absolute top-4 right-4 z-20 rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
          {badge}
        </span>
      )}
      <div className="mb-4 relative z-10 px-10 text-[var(--muted-foreground)]">
        {icon ? (
          <Image src={icon} alt="" width={32} height={32} className="h-8 w-8 object-contain text-[var(--primary)]" />
        ) : (
          <Sparkles className="h-8 w-8 text-[var(--primary)]" />
        )}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[var(--muted)] group-hover/feature:bg-[var(--primary)] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[var(--foreground)]">
          {title}
        </span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] max-w-xs relative z-10 px-10 flex-1">
        {description ?? "AI-powered tool for Buddhist studies."}
      </p>
      <div className="relative z-10 px-10 pt-4 min-h-[2rem]">
        {isDisabled ? (
          <Button variant="ghost" size="sm" disabled>
            {cta}
          </Button>
        ) : loginRequired && !isAuthenticated ? (
          <span className="relative inline-flex items-center gap-2 text-sm font-medium">
            <span className="inline-flex items-center gap-2 opacity-100 group-hover/feature:opacity-0 transition-opacity duration-200">
              Access Tool
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="absolute left-0 top-0 inline-flex items-center gap-2 opacity-0 group-hover/feature:opacity-100 transition-opacity duration-200 group-hover/feature:underline">
              Login to Access
              <ArrowRight className="h-4 w-4" />
            </span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
            {cta}
            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </>
  );

  const cardClassName = cn(
    "flex flex-col lg:border-r py-10 relative group/feature border-[var(--border)]",
    (index === 0 || index % 4 === 0) && "lg:border-l border-[var(--border)]",
    index < 4 && "lg:border-b border-[var(--border)]",
    !isDisabled && "cursor-pointer",
    isDisabled && "cursor-default opacity-80"
  );

  if (isDisabled) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link href={href} onClick={handleClick} className={cardClassName}>
      {content}
    </Link>
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
      className="text-[var(--foreground)]"
      aria-labelledby="tools-heading"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
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

        {/* NEW TOOLS – Hover effects grid */}
        {tools && tools.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 mb-16">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.id ?? tool.title}
                title={tool.title}
                description={tool.description ?? ""}
                icon={tool.icon}
                path={tool.path ?? "#"}
                loginRequired={!LoginNotRequiredList.includes(tool.title)}
                status={tool.status}
                index={index}
                badge={tool.status !== "Available" ? "Coming Soon" : undefined}
              />
            ))}
          </div>
        )}

        {/* LEGACY TOOLS – Hover effects grid */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10">
              {oldTools.map((tool, index) => (
                <ToolCard
                  key={tool.id ?? tool.title}
                  title={tool.title}
                  description={tool.description ?? ""}
                  icon={tool.icon}
                  path={`/tools/${encodeURIComponent(tool.title)}`}
                  loginRequired={!LoginNotRequiredList.includes(tool.title)}
                  status="Available"
                  index={index}
                />
              ))}
            </div>
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
