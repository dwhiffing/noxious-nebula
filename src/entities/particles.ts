import { Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

export const Particles = () => {
  let pool = Pool({ create: () => new Particle(), maxSize: 200 })
  return {
    pool,
    spawn({ x, y, size = 1, ttl = 50, opacity = 1 }) {
      pool.get({ x, y, width: size, ttl, opacity, initialOpacity: opacity })
    },
  }
}

class Particle extends Sprite {
  constructor(properties = {}) {
    super({ ...properties })
  }

  update() {
    super.update()
    this.opacity -= this.initialOpacity / this.ttl
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
