import { Pool, SpriteClass } from 'kontra'

export const Pickups = ({ canvas }) => {
  const pool = Pool({ create: () => new Pickup() })
  return {
    pool,
    spawn({ x, y, value }) {
      pool.get({ x, y, value, ttl: 400 })
    },
  }
}

class Pickup extends SpriteClass {
  constructor(properties = {}) {
    super(properties)
  }

  init(props) {
    super.init(props)
    this.opacity = 1
  }

  die() {
    this.ttl = 0
  }

  draw() {
    if (this.ttl) this.opacity -= 1 / this.ttl
    this.context.fillStyle = `rgba(255,200,0,${this.opacity})`
    this.context.beginPath()
    this.context.arc(0, 0, 3.5, 0, 2 * Math.PI)
    this.context.fill()
  }
}
