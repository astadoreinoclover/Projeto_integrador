import type { Metadata } from "next";
import "./globals.css";
import Titulo from "./components/Titulo";

export const metadata: Metadata = {
  title: "Mundo do Colecionador",
  description: "Catalogue e complete a sua coleção aqui",
  keywords: ["Mangas", "HQS", "Novels"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
