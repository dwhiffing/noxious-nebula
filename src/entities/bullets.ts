import { angleToTarget, Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

export const Bullets = ({ scene }) => {
  let pool = Pool({
    create: () => new Circle(),
    maxSize: 50,
  })
  return {
    pool,
    spawn(start, target, opts: any = {}) {
      const { x, y } = start
      const { size = 5, speed = 0, count = 1, spread = 0, index = 0 } = opts
      const offset = index * spread - spread * (count / 2)
      const angle = target ? angleToTarget(start, target) - 1.57 + offset : 0
      pool.get({
        x,
        y,
        anchor: { x: 0.5, y: 0.5 },
        width: size,
        height: size,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle),
        ttl: Infinity,
      })
    },
  }
}

export class Circle extends Sprite {
  constructor(properties = {}) {
    super(properties)
    this.r = this.r || '255'
    this.g = this.g || '255'
    this.b = this.b || '255'
  }

  draw() {
    gradient({
      x: 0 + -this.width * 1.2,
      y: 0 + -this.width * 1.2,
      ctx: this.context,
      r1: this.width / 2,
      r2: this.width * 1.2,
      c1: `rgba(${this.r},${this.g},${this.b},1)`,
      c2: `rgba(${this.r},${this.g},${this.b},0)`,
    })
  }
}
