import type { Metadata } from "next";
import ReactQueryProvider from "./_providers/ReactQueryProvider";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "God Level Dashboard",
  description: "Analytics customizável para restaurantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
