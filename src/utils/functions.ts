/**
 * Generate an array of distinct, vibrant colors.
 * @param count Number of colors needed
 * @returns Array of color strings in hex format
 */
export function getRandomVibrantColors(count: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const hue = Math.floor((360 / count) * i + Math.random() * 30); 
    const saturation = Math.floor(70 + Math.random() * 30); 
    const lightness = Math.floor(45 + Math.random() * 15); 

    colors.push(hslToHex(hue % 360, saturation, lightness));
  }

  return colors;
}

/**
 * Convert HSL to HEX
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}