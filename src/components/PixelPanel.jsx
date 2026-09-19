import './PixelPanel.css'

// Base bordered container. Every card composes this so borders/surfaces stay consistent.
function PixelPanel({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`pixel_panel ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

export default PixelPanel
