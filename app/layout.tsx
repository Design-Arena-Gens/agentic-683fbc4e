import type { Metadata } from "next";
import "./globals.css";

const title = "Java Stream Explorer";
const description = "Interactive visualizations and cheat sheets for mastering Java Streams.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://agentic-683fbc4e.vercel.app",
    siteName: title,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
