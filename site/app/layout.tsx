import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cali_FID Parrot & Exotic Rescue Sanctuary',
  description: 'A Modesto-based rescue sanctuary supporting parrots and exotic animals through care, education, rehabilitation, adoption, and sanctuary.',
  openGraph: { title: 'Cali_FID Parrot & Exotic Rescue Sanctuary', description: 'A safe landing place for parrots and exotic animals in Modesto, California.', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Cali_FID Parrot & Exotic Rescue Sanctuary' }] },
  twitter: { card: 'summary_large_image', title: 'Cali_FID Parrot & Exotic Rescue Sanctuary', description: 'A safe landing place for parrots and exotic animals in Modesto, California.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
