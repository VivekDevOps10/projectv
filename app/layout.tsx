import type { Metadata } from "next";
import "./globals.css";
import { QueueProvider } from "@/components/queue-provider";

export const metadata: Metadata = {
  title: "Live OPD Queue System",
  description: "Clinic visibility and live queue demo"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QueueProvider>{children}</QueueProvider>
      </body>
    </html>
  );
}
