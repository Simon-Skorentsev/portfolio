import './globals.scss';
import '@/styles/_index.scss';

import type { Metadata, Viewport } from 'next';

import { coolveticaRg, pragmatica } from './fonts';

export const metadata: Metadata = {
    title: "Simon's portfolio site",
    description: 'Front end developer portfolio site',
    icons: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            url: './icons/favicon.svg',
        },
    ],
    openGraph: {
        title: "Simon's portfolio site",
        type: 'website',
        description: 'Front end developer portfolio site',
        locale: 'ru',
        images: '/icons/icon-512.png',
    },
};

export const viewport: Viewport = {
    colorScheme: 'dark',
    themeColor: '#1D1D1D',
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={`${coolveticaRg.variable} ${pragmatica.variable}`}>
                {children}
            </body>
        </html>
    );
}
