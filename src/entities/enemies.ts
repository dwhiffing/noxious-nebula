import { Enemy } from './enemy'
import { Pool, randInt } from 'kontra'

const MAX_ENEMIES = 50
export const Enemies = ({ canvas, particles }) => {
  let pool = Pool({ create: () => new Enemy(), maxSize: MAX_ENEMIES })
  return {
    pool,
    spawn(target, { type = 'base', count = 1, rate = 0 }) {
      for (let i = 0; i < count; i++) {
        const b = 50
        let dir = randInt(0, 3)
        let x = -b,
          y = -b
        if (dir < 2) {
          y = randInt(b, canvas.height - b)
          if (dir === 1) x = canvas.width + b
        } else {
          x = randInt(b, canvas.width - b)
          if (dir === 3) y = canvas.height + b
        }
        setTimeout(() => {
          const ttl = Infinity
          const stats = { x, y, ttl, target, pool, particles, type }
          pool.get(stats)
        }, i * rate)
      }
    },
  }
}
