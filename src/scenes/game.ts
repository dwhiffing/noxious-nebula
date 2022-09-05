import { Enemies } from '../entities/enemies'
import { Player } from '../entities/player'
import { Bullets } from '../entities/bullets'
import { checkCollisions, distance, wrapNumber } from '../utils'
import { Particles } from '../entities/particles'
import { Store } from '../entities/store'
import { LEVELS } from '../constants'
import { angleToTarget, movePoint } from 'kontra'

export const GameScene = ({ canvas, onWin }) => {
  let bullets = Bullets()
  let particles = Particles()
  let levelIndex = 0
  const nextLevel = () => {
    player.sprite.health = 100
    let level = LEVELS[levelIndex]
    level.waves.forEach((wave) =>
      setTimeout(() => enemies.spawn(player.sprite, wave), wave.delay || 0),
    )
    bullets.pool.clear()
    levelIndex++
  }
  let store = Store({ canvas, onNext: nextLevel })
  const x = canvas.width / 2
  const y = canvas.height / 2
  let enemies = Enemies({ canvas, particles, bullets })
  let player = Player({ canvas, x, y, bullets, store, enemies })
  const checkEnd = () => {
    setTimeout(() => {
      if (enemies.getRemaining() > 0) return
      store.setActive(true)
    }, 500)
  }

  const playerEnemyCollide = (p, e) => {
    if (!p.isAlive()) return
    if (e.explodes || e.spikey) {
      const angle = wrapNumber(angleToTarget(p, e) + Math.PI, -Math.PI, Math.PI)
      const pos = movePoint({ x: p.dx, y: p.dy }, angle, 20)
      p.dx = pos.x
      p.dy = pos.y
      if (e.explodes) e.die()
      p.takeDamage(e.damage)
    }
    checkEnd()

    if (!p.isAlive()) onWin()
  }

  const bulletPlayerCollide = (b, p) => {
    b.die()
    p.takeDamage(b.damage)
  }
  const bulletEnemyCollide = (b, e) => {
    if (b.triggered || b.isEnemyBullet) return
    // TODO: stat for mine explosion distance from player
    if (b.isMine && b.position.distance(player.sprite.position) < 100) return
    if (b.isMine) b.triggered = true
    // TODO: refactor me
    setTimeout(() => {
      if (b.explodeRadius) {
        if (b.isMine) {
          b.die()
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
            .forEach((e: any) => e.takeDamage(b.damage))
        }
      } else {
        if (e.type !== 'absorber') {
          b.takeDamage(e.health)
          e.takeDamage(b.damage)
        } else {
          e.addCharge(b.health)
          b.die()
        }
      }
      checkEnd()
    }, b.triggerDuration)
  }

  nextLevel()
  return {
    nextLevel,
    shutdown() {
      enemies.pool.clear()
      bullets.pool.clear()
      player.shutdown()
    },
    update() {
      player.update()
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
        bullets.pool.getAliveObjects().filter((b: any) => b.isEnemyBullet),
        [player.sprite],
        bulletPlayerCollide,
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
