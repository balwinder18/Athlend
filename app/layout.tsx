import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar'
import { Analytics } from "@vercel/analytics/next"

import Providers from "./Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Athlend - Find Your Perfect Playing Field",
    template: "%s | Athlend"
  },
  description: "We are a local sports Ground Booking Platform. Book Your Ground Now! Find the best sports grounds, turfs, and playgrounds near you. Pay Less, Play More.",
  keywords: [
    "sports ground booking",
    "turf booking",
    "playground rental",
    "sports facility",
    "ground booking platform",
    "sports venue",
    "book ground online",
    "sports ground near me",
    "football ground booking",
    "cricket ground booking",
    "badminton court booking",
    "basketball court rental",
    "soccer field booking",
    "volleyball court rental",
    "hockey field booking",
    "athletics track rental",
    "rugby pitch booking",
    "sports complex reservation",
    "cricket ground near me",
    "football turf booking",
    "tennis court rental",
    "sports ground deals",
    "affordable ground booking",
    "local sports facilities",
    "book sports ground",
  ],
  authors: [{ name: "Athlend" }],
  creator: "Athlend",
  publisher: "Athlend",
  applicationName: "Athlend",
  
  // Open Graph / Facebook - MUST BE UNCOMMENTED!
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.athlend.com",
    title: "Athlend - Find Your Perfect Playing Field",
    description: "We are a local sports Ground Booking Platform. Book Your Ground Now! Pay Less, Play More.",
    siteName: "Athlend",
    images: [
      {
        url: "https://www.athlend.com/images/athlendsvgg.png", // ✅ Fixed - full URL
        width: 1200,
        height: 630,
        alt: "Athlend - Sports Ground Booking Platform",
      }
    ],
  },

  // Twitter - MUST BE UNCOMMENTED!
  twitter: {
    card: "summary_large_image",
    title: "Athlend - Find Your Perfect Playing Field",
    description: "We are a local sports Ground Booking Platform. Book Your Ground Now! Pay Less, Play More.",
    images: ["https://www.athlend.com/images/athlendsvgg.png"], // ✅ Fixed - full URL
    creator: "@athlend",
  },

  // Icons & Manifest
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification - Uncomment when you get your code
  // verification: {
  //   google: "your-google-verification-code-here",
  // },

  category: "Sports & Recreation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <html lang="en">


        <head>
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#03B94A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href="https://www.athlend.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Athlend",
              "image": "https://www.athlend.com/images/athlendsvgg.png",
              "description": "We are a sports Ground Booking Platform. Book Your Ground Now! Pay Less, Play More.",
              "url": "https://www.athlend.com",
              "priceRange": "$$",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "100"
              }
            })
          }}
        />
      </head>





      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
          <Providers>
            <Navbar/>
          {children}
          <Analytics/>
          <Footer/>
          <ToastContainer/>
          </Providers>
        
      </body>
    </html>
    
  );
}
