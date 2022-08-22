import { Scene } from 'kontra'
import { Enemies } from '../entities/enemies'
import { Player } from '../entities/player'
import { Bullets } from '../entities/bullets'
import { checkCollisions } from '../utils'
import { Particles } from '../entities/particles'

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
          bullet.ttl = 0
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
