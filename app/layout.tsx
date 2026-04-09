import type { Metadata } from "next";
import "./globals.css";

const metadataBase = (() => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return new URL(siteUrl);

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelUrl) return new URL(`https://${vercelUrl}`);

  return new URL("http://localhost:3000");
})();

export const metadata: Metadata = {
  metadataBase,
  title: "Captain Al's Specials",
  description: "See Captain Al's current weeknight, lunch, happy hour, and $10 lunch specials.",
  icons: {
    icon: "/logos/circle.PNG",
    shortcut: "/logos/circle.PNG",
    apple: "/logos/circle.PNG",
  },
  openGraph: {
    title: "Captain Al's Specials",
    description: "See Captain Al's current weeknight, lunch, happy hour, and $10 lunch specials.",
    images: ["/logos/capt%20als%20logo%20clean%20copy.PNG"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Captain Al's Specials",
    description: "See Captain Al's current weeknight, lunch, happy hour, and $10 lunch specials.",
    images: ["/logos/capt%20als%20logo%20clean%20copy.PNG"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
