import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arunkumar Packirisamy | Full Stack Developer",
  description:
    "Portfolio of Arunkumar Packirisamy — Full Stack Developer and UX Specialist with 15+ years of experience building web and mobile applications.",
  metadataBase: new URL("https://example.vercel.app"),
  openGraph: {
    title: "Arunkumar Packirisamy | Full Stack Developer",
    description: "Building thoughtful digital experiences with modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
