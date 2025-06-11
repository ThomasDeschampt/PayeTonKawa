import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
          <Header />
          <main>{children}</main>
      </body>
    </html>
  );
}
