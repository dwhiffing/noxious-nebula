import { Enemy } from './enemy'
import { movePoint, Pool, randInt } from 'kontra'
import { ENEMY_STATS } from '../constants'

const MAX_ENEMIES = 50
export const Enemies = ({ canvas, particles }) => {
  let pool = Pool({ create: () => new Enemy(), maxSize: MAX_ENEMIES })
  return {
    pool,
    spawn(target, wave) {
      let { type = 'homer', count = 1, rate = 0, circular, wall, dir } = wave
      dir = dir ?? randInt(0, 3)
      for (let i = 0; i < count; i++) {
        let x, y

        if (circular) {
          const { size } = ENEMY_STATS[type]
          const pos = movePoint(
            {
              x: canvas.width / 2 - size / 2,
              y: canvas.height / 2 - size / 2,
            },
            -Math.PI + ((Math.PI * 2) / count) * i,
            450,
          )
          x = pos.x
          y = pos.y
        } else {
          const b = 50
          if (!wall) dir = randInt(0, 3)
          x = -b
          y = -b
          if (dir < 2) {
            y = wall ? i * 100 : randInt(b, canvas.height - b)
            if (dir === 1) x = canvas.width + b
          } else {
            x = wall ? i * 100 : randInt(b, canvas.width - b)
            if (dir === 3) y = canvas.height + b
          }
        }
        setTimeout(
          () => {
            const ttl = Infinity
            const stats = { x, y, ttl, target, pool, particles, type }
            pool.get(stats)
          },
          wall ? 0 : i * rate,
        )
      }
    },
  }
}
