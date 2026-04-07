import "./globals.css";

export const metadata = {
  title: "Captain Al's Specials",
  description: "Get Captain Al's weekly specials by text and enter the monthly $100 gift card drawing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
