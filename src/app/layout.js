import { Playfair_Display, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Kyung-Hee Kim-Sutre — Harpiste',
  description: 'Site officiel de Kyung-Hee Kim-Sutre, harpiste',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${sourceSerif.variable}`}>
      <body>
        <div className="site-container" style={{
          border: '0.5px solid var(--color-bordure)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}