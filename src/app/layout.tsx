"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/privateroute";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "@/functions/check-is-public-route";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname!);

  return (
    <html lang="pt-BR">
      <Head>
        <title>Assinatura Digital - Portal Grupo Solar</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={roboto.className}>
        <div className="h-screen flex flex-col bg-gray-100 w-full">
          <AuthProvider>
            {isPublicPage && children}
            {!isPublicPage && (
              <PrivateRoute>
                <Header />
                <div className="flex-grow bg-gray-100 pb-4">{children}</div>
                <Footer />
              </PrivateRoute>
            )}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
