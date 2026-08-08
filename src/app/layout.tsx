import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: 'Solar Paw Sense | AI & Solar Assisted Pet Operating System',
  description: 'Ethereal, luxury pet healthcare and safety platform powered by AI and solar-assisted smart pet collars.',
  icons: {
    icon: 'https://ik.imagekit.io/yashveersinghrajpoot/solar_paw/logo.jpeg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-solar-bg text-solar-textPrimary font-sans antialiased selection:bg-solar-gold/30 selection:text-solar-forest">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
