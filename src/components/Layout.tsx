'use client';

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative  dark:from-neutral-900 via-primary-50/20 dark:via-primary-900/20 to-secondary-50/20 dark:to-secondary-900/20">
      <Header />
      <main className="grow relative z-10 pt-20 ">
        {children}
      </main>
      <Footer className="relative z-10" />
    </div>
  );
};

export default Layout;

