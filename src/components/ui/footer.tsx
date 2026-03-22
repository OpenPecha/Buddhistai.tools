"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
}

interface FooterLink {
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  href?: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  brand: {
    name: string;
    description: string;
    href?: string;
  };
  socialLinks: SocialLink[];
  columns: FooterColumn[];
  copyright?: string;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  ({ className, brand, socialLinks, columns, copyright, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pt-24", className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <a
                href={brand.href ?? "#"}
                className="text-xl font-semibold text-foreground"
              >
                {brand.name}
              </a>
              <p className="text-sm text-muted-foreground mt-1">
                {brand.description}
              </p>

              {socialLinks.length > 0 && (
                <p className="text-sm font-light text-muted-foreground mt-3.5">
                  {socialLinks.map((link, index) => (
                    <React.Fragment key={link.name}>
                      <a
                        className="hover:text-foreground transition-colors"
                        target="_blank"
                        href={link.href}
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                      {index < socialLinks.length - 1 && " • "}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 mt-16 md:grid-cols-3 lg:col-span-8 lg:justify-items-end lg:mt-0">
              {columns.map(({ title, links }) => (
                <div key={title} className="last:mt-12 md:last:mt-0">
                  <h3 className="text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {links.map(({ name, Icon, href }) => (
                      <li key={name}>
                        <a
                          href={href || "#"}
                          className="text-sm transition-all text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5"
                        >
                          <Icon className="h-4 w-4 shrink-0 stroke-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {copyright && (
            <div className="mt-20 border-t border-border pt-6 pb-8">
              <p className="text-xs text-muted-foreground">{copyright}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";
