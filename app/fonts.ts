import localFont from 'next/font/local';

const coolveticaRg = localFont({
    src: '../public/fonts/coolveticaRg.woff2',
    variable: '--font-coolvetica-rg',
    fallback: ['../public/fonts/coolveticaRg.ttf', 'system-ui'],
});

const pragmatica = localFont({
    src: [
        { path: '../public/fonts/Pragmatica-Book.woff2', weight: '400' },
        { path: '../public/fonts/Pragmatica-Medium.woff2', weight: '500' },
    ],
    variable: '--font-Pragmatica',
    fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export { coolveticaRg, pragmatica };
