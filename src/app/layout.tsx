import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Hydrate from "./Hydrate";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "SnapPal - Organize, Share, and Cherish Memories with Our Photo Album Manager",
  description:
    "Discover the ultimate photo management experience with SnapPal. Effortlessly organize your cherished moments into customizable albums, create stunning slideshows, and share your favorite memories with loved ones. Enjoy seamless navigation, robust privacy controls, and a user-friendly interface that makes managing your photo collection a breeze. Download SnapPal now and keep your precious memories just a click away.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Hydrate>
          <Header />
          <div className="flex container">
            <SideMenu />
            <div className="w-full px-4 py-2 pt-8">{children}</div>
          </div>
        </Hydrate>
      </body>
    </html>
  );
}
