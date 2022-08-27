import { angleToTarget, Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

export const Bullets = () => {
  let pool = Pool({
    create: () => new Circle(),
    maxSize: 50,
  })
  return {
    pool,
    spawn(start, target, opts: any = {}) {
      const { x, y } = start
      const { speed = 0, count = 1, spread = 0, index = 0 } = opts
      const offset = index * spread - spread * (count / 2)
      const angle = target ? angleToTarget(start, target) - 1.57 + offset : 0
      const triggerRadius = 40
      const triggerDuration = 300
      const explodeRadius = 30
      const size = 8
      pool.get({
        x,
        y,
        anchor: { x: 0.5, y: 0.5 },
        width: triggerRadius,
        height: triggerRadius,
        size,
        explodeRadius,
        triggerDuration,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle),
        ttl: Infinity,
        triggered: false,
        exploded: false,
      })
    },
  }
}

export class Circle extends Sprite {
  constructor(properties = {}) {
    super(properties)
  }

  die() {
    this.exploded = true
    setTimeout(super.die.bind(this), 100)
  }

  draw() {
    const size = this.exploded ? this.explodeRadius : this.size
    gradient({
      x: this.width / 2 - size,
      y: this.width / 2 - size,
      ctx: this.context,
      r1: size - 1,
      r2: size,
      c1: `rgba(255,${this.triggered && !this.exploded ? '0,0' : '255,255'},1)`,
      c2: `rgba(255,${this.triggered && !this.exploded ? '0,0' : '255,255'},0)`,
    })
  }
}
