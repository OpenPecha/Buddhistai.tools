import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
  /** Custom CTA content (e.g. Next.js Link with onClick); when set, href/cta are ignored for the link. */
  ctaContent?: ReactNode;
  disabled?: boolean;
  /** Optional badge (e.g. "Coming Soon") shown top-right */
  badge?: ReactNode;
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ctaContent,
  disabled = false,
  badge,
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-[var(--card)] [box-shadow:0_0_0_1px_var(--border),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:[box-shadow:0_-20px_80px_-20px_rgba(255,255,255,.06)_inset]",
      disabled && "pointer-events-none opacity-80",
      className,
    )}
  >
    {badge && (
      <div className="absolute top-4 right-4 z-20 rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
        {badge}
      </div>
    )}
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-[var(--primary)] transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-[var(--foreground)]">
        {name}
      </h3>
      <p className="max-w-lg text-[var(--muted-foreground)]">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      {ctaContent !== undefined ? (
        <div className="pointer-events-auto">{ctaContent}</div>
      ) : (
        <Button variant="ghost" asChild size="sm" className="pointer-events-auto" disabled={disabled}>
          <a href={href}>
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[var(--primary)]/[.03]" />
  </div>
);

export { BentoCard, BentoGrid };
