'use client';

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (<div className="flex flex-col min-h-screen relative ">
      <Header />
      <main className="grow relative z-10  ">
        {children}
      </main>
      <Footer className="relative z-10" />
    </div>
  );
};

export default Layout;

