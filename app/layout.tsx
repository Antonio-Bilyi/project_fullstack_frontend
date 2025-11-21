import type { Metadata } from "next";
import { Nunito_Sans, Sora } from "next/font/google";
import "normalize.css";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-family-nunito", //в макеті --font-family
  subsets: ["cyrillic"], //в макеті --second-family
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-family-sora", //в макеті --second-family
  subsets: ["latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Подорожники",
  description: "Проєкт, створений для тих, хто живе подорожами",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Подорожники",
    description:
      "Вебсайт для тих хто живе подорожами і хоче ділитися враженнями",
    url: "", //тут має бути посилання на задеплоєний проект
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg", //замінити картинку на картинку з макету
        width: 1200,
        height: 630,
        alt: "Подорожники",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  // modal,
}: Readonly<{
  children: React.ReactNode;
  // modal: React.ReactNode;
}>) {
  return (
    <html lang="ua">
      <body className={`${nunitoSans.variable} ${sora.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <main>
              {children}
              {/* {modal} */}
            </main>
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
