import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Header from '@/components/ui/Header'
import Footer from "@/components/ui/Footer";

const paperlogy = localFont({
  src: [
    { path: '../../public/fonts/Paperlogy-1Thin.ttf', weight: '100' },
    { path: '../../public/fonts/Paperlogy-2ExtraLight.ttf', weight: '200' },
    { path: '../../public/fonts/Paperlogy-3Light.ttf', weight: '300' },
    { path: '../../public/fonts/Paperlogy-4Regular.ttf', weight: '400' },
    { path: '../../public/fonts/Paperlogy-5Medium.ttf', weight: '500' },
    { path: '../../public/fonts/Paperlogy-6SemiBold.ttf', weight: '600' },
    { path: '../../public/fonts/Paperlogy-7Bold.ttf', weight: '700' },
    { path: '../../public/fonts/Paperlogy-8ExtraBold.ttf', weight: '800' },
    { path: '../../public/fonts/Paperlogy-9Black.ttf', weight: '900' },
  ],
  variable: '--font-paperlogy',
});

export const metadata: Metadata = {
  title: "포트폴리오 | Chamin",
  description: "Chamin의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${paperlogy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
