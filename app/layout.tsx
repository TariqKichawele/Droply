import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Droply",
  description: "Droply is a file sharing platform that allows you to share files with your friends and family.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${poppins.variable} ${inter.variable} antialiased`}
        >
          <Providers
            themeProps={{
              attribute: "class",
              defaultTheme: "light",
              themes: ["light", "dark"],
              enableSystem: true,
              disableTransitionOnChange: false,
            }}
          >
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
