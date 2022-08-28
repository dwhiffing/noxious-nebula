import { Pool } from 'kontra'
import { gradient } from '../utils'
import { Sprite } from './sprite'

const MAX_BULLETS = 50

export const Bullets = () => {
  let pool = Pool({ create: () => new Bullet(), maxSize: MAX_BULLETS })
  return {
    pool,
    spawn(opts) {
      const { speed = 0, angle = 0 } = opts
      return pool.get({
        x: opts.x,
        y: opts.y,
        anchor: { x: 0.5, y: 0.5 },
        width: opts.triggerRadius || opts.size || 0,
        height: opts.triggerRadius || opts.size || 0,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle),
        size: opts.size || 0,
        explodeRadius: opts.explodeRadius || 0,
        triggerDuration: opts.triggerDuration || 0,
        isMine: opts.isMine || 0,
        ttl: opts.ttl || Infinity,
        triggered: false,
        damage: opts.damage,
      })
    },
  }
}

class Bullet extends Sprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(props) {
    super.init(props)
    this.opacity = 1
  }

  draw() {
    if (this.ttl) this.opacity -= 1 / this.ttl
    const size = this.size
    gradient({
      x: this.width / 2 - size,
      y: this.width / 2 - size,
      ctx: this.context,
      r1: size - 1,
      r2: size,
      c1: `rgba(120,${this.isMine && this.triggered ? '0,0' : '120,120'},${
        this.opacity
      })`,
      c2: `rgba(120,${this.isMine && this.triggered ? '0,0' : '120,120'},0)`,
    })
  }
}
