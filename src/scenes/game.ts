import { Enemies } from '../entities/enemies'
import { Player } from '../entities/player'
import { Bullets } from '../entities/bullets'
import { checkCollisions, distance } from '../utils'
import { Particles } from '../entities/particles'
import { Store } from '../entities/store'

export const GameScene = ({ canvas, onWin }) => {
  let bullets = Bullets()
  let particles = Particles()

  const nextWave = () => {
    player.sprite.health = 100
    enemies.spawn(player.sprite, 10, 1000)
  }
  let store = Store({ canvas, onNext: nextWave })
  const x = canvas.width / 2
  const y = canvas.height / 2
  let player = Player({ canvas, x, y, bullets, store })
  let enemies = Enemies({ canvas, particles })
  const checkEnd = () => {
    setTimeout(() => {
      if (enemies.pool.getAliveObjects().length !== 0) return
      store.setActive(true)
    }, 500)
  }

  const playerEnemyCollide = (p, e) => {
    if (!p.isAlive()) return
    e.die()
    p.takeDamage(e.damage)
    checkEnd()

    if (!p.isAlive()) onWin()
  }

  const bulletEnemyCollide = (b, e) => {
    if (b.triggered || b.position.distance(player.sprite.position) < 100) return
    b.triggered = true
    // TODO: refactor me
    setTimeout(() => {
      // bullets should only die when theyve got no energy?
      b.die()

      if (b.explodeRadius) {
        particles.spawn({
          x: b.x,
          y: b.y,
          size: b.explodeRadius,
          opacity: 0.9,
          ttl: 40,
        })
        enemies.pool
          .getAliveObjects()
          .filter((e) => distance(e, b) < b.explodeRadius)
          .forEach((e: any) => e.die())
      } else {
        // TODO: calculate damge?

        e.die()
      }
      checkEnd()
    }, b.triggerDuration)
  }

  nextWave()
  return {
    nextWave,
    shutdown() {
      enemies.pool.clear()
      bullets.pool.clear()
      player.shutdown()
    },
    update() {
      player.sprite.update()
      enemies.pool.update()
      bullets.pool.update()
      particles.pool.update()
      store.update()
      checkCollisions(
        bullets.pool.getAliveObjects(),
        enemies.pool.getAliveObjects(),
        bulletEnemyCollide,
      )
      checkCollisions(
        [player.sprite],
        enemies.pool.getAliveObjects(),
        playerEnemyCollide,
      )
    },
    render() {
      player.sprite.render()
      particles.pool.render()
      enemies.pool.render()
      bullets.pool.render()
      store.render()
    },
  }
}
