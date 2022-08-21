import { Enemy } from './enemy'
import { Pool } from 'kontra'

export const Enemies = (scene) => {
  let pool = Pool({ create: () => new Enemy(), maxSize: 100 })

  return {
    pool,
    spawn(x, y, target) {
      for (let i = 0; i < 1; i++) {
        setTimeout(() => {
          const enemy = pool.get({ x, y, ttl: Infinity, target })
          if (enemy && !scene.objects.includes(enemy)) scene.add(enemy)
        }, i * 100)
      }
    },
    destroy() {
      pool.clear()
    },
    update() {
      pool.update()
    },
    render() {
      pool.render()
    },
  }
}
