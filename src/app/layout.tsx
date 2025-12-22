import type { Metadata } from 'next';
import { DEFAULT_SEO_METADATA } from '@/lib/seoMetadata';
import ClientWrapper from '@/components/ClientWrapper';
import "@/styles/globals.css";
import "@/styles/tailwind.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserbackProvider } from '@/components/UserbackProvider';
import Script from 'next/script';
const userbackId = process.env.USERBACK_ID||"";

export const metadata: Metadata = {
  title: DEFAULT_SEO_METADATA.title,
  description: DEFAULT_SEO_METADATA.description,
  keywords: DEFAULT_SEO_METADATA.keywords,
  openGraph: {
    title: DEFAULT_SEO_METADATA.openGraph.title,
    description: DEFAULT_SEO_METADATA.openGraph.description,
    url: DEFAULT_SEO_METADATA.openGraph.url,
    siteName: DEFAULT_SEO_METADATA.openGraph.siteName,
    images: [
      {
        url: DEFAULT_SEO_METADATA.openGraph.image,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_SEO_METADATA.twitter.title,
    description: DEFAULT_SEO_METADATA.twitter.description,
    images: [DEFAULT_SEO_METADATA.twitter.image],
    site: DEFAULT_SEO_METADATA.twitter.site,
  },
  icons: {
    icon: '/icon_logo.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className='dark'>
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PH3KCT6B');
          `}
        </Script>
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(DEFAULT_SEO_METADATA.structuredData),
          }}
        />
 
      </head>

      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PH3KCT6B"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <UserProvider>
          <UserbackProvider userbackId={userbackId}>
          <ClientWrapper>
          <div className="min-h-screen w-full bg-black relative">
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#000000",
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
        radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px, 20px 20px, 20px 20px",
      backgroundPosition: "0 0, 0 0, 0 0",
      opacity: 0.1,
    }}
  />
            {children}
</div>
          </ClientWrapper>
          </UserbackProvider>
        </UserProvider>
      </body>

    </html>
  )
}

