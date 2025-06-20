import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return {
            beforeFiles: [],
            afterFiles: [],
            fallback: [
                {
                    source: '/:path*',
                    destination: '/',
                },
            ],
        };
    },
    // sassOptions: { //
    //     includePaths: [path.join(__dirname, 'styles')],
    //     additionalData: `@use "index" as *;`,
    // },
};

export default nextConfig;
