// Sprite registry. To use your own art: drop the PNG strip into src/assets/sprites/ (same file name),
// then set frameWidth / frameHeight / frames / frameMs below to match. No component changes needed.
//
// Strip format: transparent PNG, frames side by side (left to right), all frames the same size, no padding,
// exported at 1x. Frames play at equal timing, so repeat a frame in the strip to hold it longer
// (e.g. eyes-open x5, then eyes-closed x1 gives a natural blink).
//
// alwaysAnimate: true keeps the sprite playing even when the OS asks for reduced motion (default: it stops on frame 1).
//
// Until a PNG exists, the sprite shows a labelled placeholder box of the right size.
const art = import.meta.glob('../assets/sprites/*.png', { eager: true, query: '?url', import: 'default' })
const find = (file) => art[`../assets/sprites/${file}`]

export const sprites = {
  avatar: {
    src: find('avatar.png'),
    file: 'avatar.png',
    frameWidth: 64,
    frameHeight: 64,
    frames: 8,
    frameMs: 700,
    alwaysAnimate: true,
  },
}
