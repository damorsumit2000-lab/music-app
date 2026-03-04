import './globals.css';

export const metadata = {
  title: 'Rhythmix — Music for the Bold',
  description: 'A full-featured YouTube Music-powered web player',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
