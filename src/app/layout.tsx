import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';
import { PanierProvider } from '@/context/PanierContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <PanierProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </PanierProvider>
      </body>
    </html>
  );
}
