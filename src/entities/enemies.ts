import { Enemy } from './enemy'
import { movePoint, Pool, randInt } from 'kontra'
import { ENEMY_STATS } from '../constants'
import { requestTimeout } from '../utils'

const MAX_ENEMIES = 50
export const Enemies = ({ canvas, particles, bullets, pickups }) => {
  let pool = Pool({ create: () => new Enemy(), maxSize: MAX_ENEMIES })
  let toSpawn = 0
  return {
    pool,
    getRemaining() {
      return toSpawn + pool.getAliveObjects().length
    },
    spawn(target, wave, delay = 0) {
      // TODO: refactor
      let { type = 'homer', count = 1, rate = 0, circular, wall, dir } = wave
      toSpawn += count
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
        requestTimeout(() => {
          const ttl = Infinity
          pool.get({
            x,
            y,
            ttl,
            target,
            pool,
            bullets,
            particles,
            pickups,
            type,
          })
          toSpawn--
        }, delay + (wall ? 0 : i * rate))
      }
    },
  }
}
