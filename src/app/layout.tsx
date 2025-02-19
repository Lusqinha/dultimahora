import { BottomNav } from "@/components/layout/bottom-nav";
import { TermsBanner } from "@/components/layout/term-banner";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";
import "./globals.css";
import { host, plausible_domain, GAID } from "@/lib/env"
import { DesktopNav } from "@/components/layout/desktop-nav";
import { GoogleAnalytics } from "@next/third-parties/google"

export const metadata: Metadata = {
  title: "D'Ultima Hora | Santa Maria",
  description: "No D'Ultimahora você pode revender seu ingresso de shows/eventos e também encontrar ingressos para vender! Encontre lotes anteriores, valores abaixo, ingressos limitados e opções melhores!",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${host}`,
    title: "D'Ultima Hora | Santa Maria",
    description: "No D'Ultimahora você pode revender seu ingresso de shows/eventos e também encontrar ingressos para vender! Encontre lotes anteriores, valores abaixo, ingressos limitados e opções melhores!",
    siteName: "D'Ultima Hora",
    countryName: "Brasil",
    determiner: "the",
    
    images: [
      {
        url: `${host}/img/og-dultima.png`,
        width: 1296,
        height: 579,
        alt: "Og Image",
      },
    ]
  },
  twitter: {
    images: [
      {
        url: `${host}/img/og-dultima.png`,
        width: 1296,
        height: 579,
        alt: "Og Image",
      },
    ],
    card: "summary_large_image",
    site: `${host}`,
    title: "D'Ultima Hora | Santa Maria",
    description: "No D'Ultimahora você pode revender seu ingresso de shows/eventos e também encontrar ingressos para vender! Encontre lotes anteriores, valores abaixo, ingressos limitados e opções melhores!",
    siteId: "@dultimahora.app",
    creator: "@dultimahora.app",

  },

  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <script defer data-domain={plausible_domain} src="https://dultimahora-plausible-analytics.flkkfw.easypanel.host/js/script.js"></script>
      </head>
      <body
        className={` antialiased bg-white overflow-x-hidden` }
      >
        <DesktopNav />
          <main className="pb-12 md:pb-0">
            {children}
        </main>
        <TermsBanner />
        <Footer />
        <BottomNav/>
      </body>
      <GoogleAnalytics gaId={GAID} />
    </html>
  );
}
