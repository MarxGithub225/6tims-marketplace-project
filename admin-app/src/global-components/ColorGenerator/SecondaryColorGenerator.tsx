import chroma from 'chroma-js';

export function SecondaryColorGenerator(rgbColor: string, factor: number) {
    const color = chroma(rgbColor);
    const originalLuminance = color.luminance();
    const newLuminance = originalLuminance + factor;

    //la luminance maximale est 1 (100%)
    const clampedLuminance = Math.min(newLuminance, 1);

    const newColor = color.set('hsl.l', clampedLuminance);

    return newColor.rgb();
}
