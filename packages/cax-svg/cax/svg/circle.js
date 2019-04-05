import Circle from '../render/display/shape/circle'
import { parseStyle } from './parse-style'

export function circle(props) {

  const options = Object.assign({
    r: 0,
    cx: 0,
    cy: 0
  }, props)

  const circle = new Circle(Number(options.r), parseStyle(props.style))
  circle.x = Number(options.cx)
  circle.y = Number(options.cy)

  return circle

}