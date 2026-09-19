import { pixelIconGrids } from './pixelIconGrids'

// Turns each grid into one SVG path of 1x1 cells, built once at load.
const paths = Object.fromEntries(
  Object.entries(pixelIconGrids).map(([name, rows]) => [
    name,
    rows
      .flatMap((row, y) => [...row].map((cell, x) => (cell === '#' ? `M${x} ${y}h1v1h-1z` : '')))
      .join(''),
  ])
)

// Draws in currentColor, so buttons recolor icons on hover/active. Use an even `scale` so cells stay crisp.
function PixelIcon({ name, scale = 2, className = '' }) {
  const size = 12 * scale
  return (
    <svg
      className={`pixel_icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export default PixelIcon
