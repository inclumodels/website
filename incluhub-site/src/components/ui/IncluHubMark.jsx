/**
 * Real IncluHub logo — white PNG on transparent background.
 * Use `size` to control height; width scales automatically.
 * Use `variant` "mark" for just the constellation icon (cropped view via objectPosition).
 */
export default function IncluHubMark({ size = 48, style = {} }) {
  return (
    <img
      src="/logo.png"
      alt="IncluHub"
      style={{
        height: size,
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        ...style,
      }}
    />
  )
}
