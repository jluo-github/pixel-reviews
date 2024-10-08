import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Exo_2 } from "next/font/google";
import Link from "next/link";

const exo2 = Exo_2({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Game Reviews",
    template: "%s | Game Reviews",
  },
  description: "Game reviews from the best games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${exo2.className}`}>
        <div className='min-h-screen flex flex-col'>
          <NavBar />

          <main className='container mx-auto flex-grow'> {children}</main>

          <footer className='flex items-center justify-center text-sm border-t-2 border-gray-300 py-4'>
            <p className='mr-1'> Game data and images of </p>
            <Link href='https://rawg.io' target='_blank'>
              {" "}
              RAWG{" "}
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
