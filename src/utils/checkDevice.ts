export const devices = {
    desktop: Infinity,
    tablet: 1280,
    mobile: 912,
    mobileSmall: 768,
}

export function checkDevice(device: keyof typeof devices): boolean {
    const makeQuery = (px: number) => {
        return window.matchMedia(`(max-width: ${px}px)`);
    }

    return makeQuery(devices[device]).matches;
}