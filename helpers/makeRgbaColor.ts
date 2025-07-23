export enum Colors {
    TEXT_PRIMARY = 'rgb(255, 255, 255)',
    TEXT_SECONDARY = 'rgb(141, 141, 141)',
    TEXT_ACCENT = 'rgb(8, 253, 216)',
    TEXT_ACCENT_DARK = 'rgb(73, 197, 182)',
    BG_PRIMARY = 'rgb(29, 29, 29)',
    BG_ACCENT = 'rgb(142, 92, 255)',
    BG_ACCENT_DARK = 'rgb(75, 45, 154)',
}

export function makeRgbaColor(rgbColor: Colors, opacity = 1) {
    return `rgba(${rgbColor.slice(4, -1)}, ${opacity})`;
}
