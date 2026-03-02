import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hibiso admin",
  description: "This is a admin page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
