'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const { user, isLoading } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 bg-[var(--surface)]/70 dark:bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/icon_logo.png"
            alt="Pecha Tools Logo"
            width={36}
            height={36}
            className="rounded-lg object-contain"
          />
          <span className="text-xl font-semibold tracking-tight text-[var(--foreground)] group-hover:opacity-90 transition-opacity">
            Buddhist AI Studio
          </span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-1" aria-label="Main">
            <a
              href="#tools"
              className="px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)] transition-colors"
            >
              Tools
            </a>
            <a
              href="#vision"
              className="px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg hover:bg-[var(--accent)] transition-colors"
            >
              Vision
            </a>
          </nav>
          
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button> */}
          
          {user ? (
            <div className="flex items-center gap-3 relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                onKeyDown={(e) => e.key === "Enter" && setShowDropdown(!showDropdown)}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] transition-colors text-left"
              >
                <Avatar title={user?.name || undefined}>
                  <AvatarImage src={user?.picture || undefined} />
                  <AvatarFallback className="bg-[var(--primary)] text-[var(--primary-foreground)]">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-[var(--foreground)] truncate">{user?.name ?? "Profile"}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">Active</span>
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-52 py-1.5 rounded-xl bg-[var(--popover)] border border-[var(--border)] shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    Profile
                  </Link>
                  <a
                    href="/auth/logout"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
            >
              Sign in
            </a>
          )}
        </div>

        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2.5 rounded-xl text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={showMobileMenu}
          >
            {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--surface-elevated)]/95 backdrop-blur-xl border-t border-[var(--border)] z-40" ref={mobileMenuRef}>
          <div className="max-w-6xl mx-auto px-4 py-5">
            {!isLoading && user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
                  <Avatar title={user?.name || undefined}>
                    <AvatarImage src={user?.picture || undefined} />
                    <AvatarFallback className="bg-[var(--primary)] text-[var(--primary-foreground)]">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-[var(--foreground)]">{user?.name ?? "Profile"}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">Active</span>
                  </div>
                </div>
                <nav className="space-y-1 pb-4 border-b border-[var(--border)]">
                  <a href="#tools" className="block px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors" onClick={() => setShowMobileMenu(false)}>Tools</a>
                  <a href="#vision" className="block px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors" onClick={() => setShowMobileMenu(false)}>Vision</a>
                </nav>
                <div className="space-y-1">
                  <Link href="/profile" className="block px-3 py-2.5 text-sm text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors" onClick={() => setShowMobileMenu(false)}>Profile</Link>
                  <a href="/auth/logout" className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[var(--destructive)] hover:bg-[var(--destructive)]/10 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <nav className="space-y-1 mb-4 pb-4 border-b border-[var(--border)]">
                  <a href="#tools" className="block px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors" onClick={() => setShowMobileMenu(false)}>Tools</a>
                  <a href="#vision" className="block px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)] rounded-lg transition-colors" onClick={() => setShowMobileMenu(false)}>Vision</a>
                </nav>
                <a href="/auth/login" className="block w-full py-3 text-center text-sm font-medium rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity">Sign in</a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

