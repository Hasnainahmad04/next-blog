import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@components/Nav";
import ReactQueryProvider from "@components/QueryProvider";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@components/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medium",
  description: "Medium Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReactQueryProvider>
            <Nav />
            <NextTopLoader color="#2C6634" showSpinner={false} />
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
