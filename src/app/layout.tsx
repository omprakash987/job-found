import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from 'react-hot-toast'; 


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Job-Found",
  description: "find your dream job || find the perfect candidate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                ></Toaster>
            </div>
       {children}
       
      </body>
    </html>
  );
}
