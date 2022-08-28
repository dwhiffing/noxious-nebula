import { angleToTarget, Pool } from 'kontra'
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
      triggerRadius = 45,
      triggerDuration = 300,
      explodeRadius = 35,
      size = 3,
    }) {
      pool.get({
        x,
        y,
        anchor: { x: 0.5, y: 0.5 },
        width: triggerRadius,
        height: triggerRadius,
        size,
        explodeRadius,
        triggerDuration,
        ttl: Infinity,
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

  draw() {
    const size = this.size
    gradient({
      x: this.width / 2 - size,
      y: this.width / 2 - size,
      ctx: this.context,
      r1: size - 1,
      r2: size,
      c1: `rgba(120,${this.triggered ? '0,0' : '120,120'},1)`,
      c2: `rgba(120,${this.triggered ? '0,0' : '120,120'},0)`,
    })
  }
}
