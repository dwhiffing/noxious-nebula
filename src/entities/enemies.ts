import { Enemy } from './enemy'
import { Pool } from 'kontra'

export const Enemies = ({ scene, particles }) => {
  let pool = Pool({ create: () => new Enemy(), maxSize: 40 })
  return {
    pool,
    spawn(x, y, target) {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          pool.get({ x, y, ttl: Infinity, target, pool, particles })
        }, i * 100)
      }
    },
  }
}
