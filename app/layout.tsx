import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: " Ulff Williams - Portfolio",
  description:
    "Portfolio of William Ulff - Web developer, designer and artist. Based somewhere in Sweden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
