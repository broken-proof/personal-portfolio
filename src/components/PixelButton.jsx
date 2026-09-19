import './PixelButton.css'

// as: element/component to render ("a" by default, "button" for actions)
// variant: "primary" | "ghost" | "nav" | "icon"
function PixelButton({ as: Tag = 'a', variant = 'ghost', active = false, className = '', children, ...rest }) {
  const classes = ['pixel_button', `pixel_button_${variant}`, active && 'is_active', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export default PixelButton
