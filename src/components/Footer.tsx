import { BookOpen, Heart, Globe, Users, Brain, Sparkles } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`border-t border-[var(--border)] bg-[var(--surface-elevated)] py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
                <img src="/icon_logo.png" alt="" width={28} height={28} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Buddhist AI Studio</h3>
                <p className="text-xs text-[var(--muted-foreground)]">AI-Enhanced Buddhist Manuscript Tools</p>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
              Preserving and sharing the wisdom of Buddhist teachings through AI-powered digital tools.
            </p>
            <div className="flex flex-col gap-2 text-sm text-[var(--muted-foreground)]">
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[var(--primary)] shrink-0" />
                Created with compassion
              </span>
              <span className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-[var(--primary)] shrink-0" />
                Powered by AI
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "#tools", label: "AI Tools" },
                { href: "#vision", label: "Vision" },
                { href: "https://forum.openpecha.org", label: "Forum", external: true },
              ].map(({ href, label, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--muted-foreground)] group-hover:bg-[var(--foreground)]" />
                    {label}
                    {external && <BookOpen className="h-3 w-3 opacity-70" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Our Mission</h4>
            <div className="space-y-4">
              {[
                { Icon: Globe, title: "Global Access", desc: "Making Buddhist wisdom accessible worldwide through AI" },
                { Icon: Users, title: "Community", desc: "Bridges between tradition and AI technology" },
                { Icon: Sparkles, title: "AI Innovation", desc: "AI for manuscript analysis and study" },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="p-2 rounded-lg bg-[var(--card)] border border-[var(--border)] shrink-0">
                    <Icon className="h-4 w-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-[var(--foreground)] mb-0.5">{title}</h5>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted-foreground)]">
          <p>&copy; 2025 Buddhist AI Studio.</p>
          <p className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-400/90" />
            Some tools use AI to enhance manuscript processing and analysis.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

