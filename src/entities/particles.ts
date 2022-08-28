import { Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

export const Particles = () => {
  let pool = Pool({ create: () => new Circle(), maxSize: 100 })
  return {
    pool,
    spawn({ x, y, size = 3, ttl = 15, opacity = 0.4, opacityDecay = 0.03 }) {
      pool.get({ x, y, width: size, ttl, opacity, opacityDecay })
    },
  }
}

class Circle extends Sprite {
  constructor(properties = {}) {
    super({ ...properties })
  }

  update() {
    super.update()
    this.opacity -= this.opacityDecay
  }

  draw() {
    gradient({
      ctx: this.context,
      x: -this.width,
      y: -this.width,
      r1: this.width / 1.5,
      r2: this.width,
      c1: `rgba(255,255,255,${this.opacity})`,
      c2: `rgba(255,255,255,0)`,
    })
  }
}
