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
        width: 80,
        height: 80,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle),
        ttl: Infinity,
        triggered: false,
      })
    },
  }
}

export class Circle extends Sprite {
  constructor(properties = {}) {
    super(properties)
  }

  draw() {
    gradient({
      x: 40,
      y: 40,
      ctx: this.context,
      r1: 5,
      r2: 8,
      c1: `rgba(255,255,255,1)`,
      c2: `rgba(255,255,255,0)`,
    })
  }
}
