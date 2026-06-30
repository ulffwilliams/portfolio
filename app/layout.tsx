import type { Metadata } from "next";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import ClickSpark from "../components/ClickSpark";

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
      <body className={` antialiased`}>
        <ClickSpark
          sparkColor="#f54269"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {children}
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  );
}
