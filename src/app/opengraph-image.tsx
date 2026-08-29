export { size, contentType, alt } from "./_og/render"
import { renderOgImage } from "./_og/render"

export default function Image() {
  return renderOgImage()
}
