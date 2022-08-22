import { Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

export const Particles = () => {
  let pool = Pool({ create: () => new Circle(), maxSize: 100 })
  return {
    pool,
    spawn(x, y) {
      pool.get({ x, y, width: 5, ttl: 25, opacity: 0.6 })
    },
  }
}

class Circle extends Sprite {
  constructor(properties = {}) {
    super({ ...properties })
  }

  update() {
    super.update()
    this.opacity -= 0.02
  }

  draw() {
    gradient({
      ctx: this.context,
      x: this.width * -2,
      y: this.width * -2,
      r1: this.width,
      r2: this.width * 2,
      c1: `rgba(255,255,255,${this.opacity})`,
      c2: `rgba(255,255,255,0)`,
    })
  }
}
