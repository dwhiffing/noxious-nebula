import { Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

export const Bullets = () => {
  let pool = Pool({
    create: () => new Bullet(),
    maxSize: 50,
  })
  return {
    pool,
    spawn({
      x,
      y,
      angle = 0,
      speed = 0,
      triggerRadius = 45,
      triggerDuration = 300,
      explodeRadius = 35,
      size = 3,
      opacityDecay = 0,
      ttl = Infinity,
    }) {
      pool.get({
        x,
        y,
        anchor: { x: 0.5, y: 0.5 },
        width: triggerRadius,
        height: triggerRadius,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle),
        size,
        explodeRadius,
        triggerDuration,
        opacityDecay,
        ttl,
        triggered: false,
        exploded: false,
      })
    },
  }
}

export class Bullet extends Sprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(props) {
    super.init(props)
    this.opacity = 1
  }
  draw() {
    if (this.opacityDecay) this.opacity -= this.opacityDecay
    const size = this.size
    gradient({
      x: this.width / 2 - size,
      y: this.width / 2 - size,
      ctx: this.context,
      r1: size - 1,
      r2: size,
      c1: `rgba(120,${this.triggered ? '0,0' : '120,120'},${this.opacity})`,
      c2: `rgba(120,${this.triggered ? '0,0' : '120,120'},0)`,
    })
  }
}
