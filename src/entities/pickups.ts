import { Pool } from 'kontra'
import { Sprite } from './sprite'

export const Pickups = () => {
  return Pool({ create: () => new Pickup() })
}

class Pickup extends Sprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(props) {
    super.init(props)
    this.opacity = 1
  }

  draw() {
    if (this.ttl) this.opacity -= 1 / this.ttl
    this.context.fillStyle = '#ff0'
    this.context.beginPath()
    this.context.arc(0, 0, 10, 0, 2 * Math.PI)
    this.context.fill()
  }
}
