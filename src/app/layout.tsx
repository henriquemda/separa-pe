import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Separa.pe | Reserva de Canchas de Fútbol en Perú - 1-Clic por Yape & Plin",
  description: "El ecosistema #1 en Perú para alquiler de canchas sintéticas y de grass. Reserva en segundos, divide la cuota entre tu mancha por Yape/Plin y elimina horarios muertos en tu complejo deportivo.",
  keywords: ["separa pe", "alquiler de canchas peru", "canchas sinteticas surco", "reserva canchas futbol lima", "software canchas peru", "yape canchas"],
  icons: {
    icon: "/icon.jpg",
    apple: "/apple-icon.jpg",
  },
  openGraph: {
    title: "Separa.pe | Reserva Canchas de Fútbol en Perú",
    description: "Encuentra y reserva tu cancha en Surco, San Borja, Los Olivos, Arequipa y Trujillo en segundos con Yape y Plin.",
    url: "https://separa.pe",
    siteName: "Separa.pe",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Separa.pe - Reservas de Canchas en 1-Clic Perú",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#040806] text-gray-100 font-sans">{children}</body>
    </html>
  );
}


