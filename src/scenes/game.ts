import { Scene } from 'kontra'
import { Enemies } from '../entities/enemies'
import { Player } from '../entities/player'
import { Bullets } from '../entities/bullets'
import { checkCollisions } from '../utils'
import { Particles } from '../entities/particles'
import { distance } from '../entities/enemy'

export const GameScene = ({ canvas, onWin }) => {
  let scene = Scene({ id: 'game' })
  let bullets = Bullets({ scene })
  let particles = Particles({ scene })
  let player = Player({ scene, x: 300, y: 300, bullets })
  let enemies = Enemies({ scene, particles })
  scene.add(player.sprite)
  enemies.spawn(300, 100, player.sprite)

  return {
    shutdown() {
      enemies.pool.clear()
      bullets.pool.clear()
      player.shutdown()
    },
    update() {
      scene.update()
      enemies.pool.update()
      bullets.pool.update()
      particles.pool.update()
      checkCollisions(
        bullets.pool.getAliveObjects(),
        enemies.pool.getAliveObjects(),
        (bullet, enemy) => {
          if (bullet.triggered) return
          bullet.triggered = true
          setTimeout(() => {
            // make bullet create explosion and damage enemies within range of center instead
            bullet.die()
            enemies.pool
              .getAliveObjects()
              .filter((e) => distance(e, bullet) < 50)
              .forEach((e: any) => e.die())
          }, 500)
        },
      )
      checkCollisions(
        [player.sprite],
        enemies.pool.getAliveObjects(),
        (player, enemy) => {
          if (!player.isAlive()) return
          enemy.die()
          player.damage(10)
          if (!player.isAlive()) onWin()
        },
      )
    },
    render() {
      scene.render()
      particles.pool.render()
      enemies.pool.render()
      bullets.pool.render()
    },
  }
}
