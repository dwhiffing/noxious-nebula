import { Enemies } from '../entities/enemies'
import { Player } from '../entities/player'
import { Bullets } from '../entities/bullets'
import { checkCollisions, distance, playSound, wrapNumber } from '../utils'
import { requestTimeout } from '../utils'
import { Particles } from '../entities/particles'
import { Store } from '../entities/store'
import { LEVELS } from '../constants'
import { angleToTarget, movePoint, randInt } from 'kontra'
import { Pickups } from '../entities/pickups'

export const GameScene = ({ canvas, onWin, onLose }) => {
  let bullets = Bullets()
  let particles = Particles()
  let levelIndex = 0
  let endTriggered = false
  const nextLevel = () => {
    endTriggered = false
    player.sprite.health = 100
    let level = LEVELS[levelIndex]
    level.waves.forEach((wave) =>
      enemies.spawn(player.sprite, wave, wave.delay || 0),
    )
    bullets.pool.clear()
    levelIndex++
  }
  const x = canvas.width / 2
  const y = canvas.height / 2
  let pickups = Pickups({ canvas })
  let enemies = Enemies({ canvas, particles, bullets, pickups })
  let player = Player({
    canvas,
    x,
    y,
    bullets,
    getStoreActive: () => store.getActive(),
    enemies,
  })
  let store = Store({
    canvas,
    onNext: nextLevel,
    onPurchase: (upgrade) => player.buyUpgrade(upgrade),
    getPlayer: () => player,
  })

  const checkEnd = () => {
    setTimeout(() => {
      if (
        enemies.getRemaining() > 0 ||
        player.sprite.health <= 0 ||
        endTriggered
      )
        return
      endTriggered = true
      requestTimeout(() => {
        let level = LEVELS[levelIndex]
        if (!level) return onWin(player.sprite.money)
        playSound('playerWin')
        store.setActive(true)
        bullets.pool.clear()
      }, 1500)
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
      playSound('playerHit')
      p.takeDamage(e.damage)
    }
    checkEnd()

    if (!p.isAlive()) {
      playSound('playerDie')
      onLose()
    }
  }

  const pickupPlayerCollide = (b, p) => {
    b.die()
    playSound('pickup')
    p.getMoney(b.value)
  }

  const bulletPlayerCollide = (b, p) => {
    b.die()
    playSound('playerHit')
    p.takeDamage(b.damage)
  }
  const bulletEnemyCollide = (b, e) => {
    if (b.triggered || b.isEnemyBullet) return
    // TODO: stat for mine explosion distance from player
    if (b.isMine && b.position.distance(player.sprite.position) < 100) return
    if (b.isMine) b.triggered = true
    // TODO: refactor
    setTimeout(() => {
      if (b.explodeRadius) {
        if (b.isMine) {
          b.die()
          playSound('mineExplode')

          particles.spawn({
            x: b.x,
            y: b.y,
            size: b.explodeRadius,
            opacity: 0.9,
            ttl: 40,
          })
          enemies.pool
            .getAliveObjects()
            .filter((e: any) => distance(e, b) < b.explodeRadius)
            .forEach((e: any) => {
              if (e.type === 'defender') {
                playSound('shieldHit')
              } else {
                setTimeout(() => e.takeDamage(b.damage), randInt(10, 200))
              }
            })
        }
      } else {
        if (e.type !== 'absorber') {
          b.takeDamage(e.health)
          e.takeDamage(b.damage, true)
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
      pickups.pool.update()
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
        pickups.pool.getAliveObjects(),
        [player.sprite],
        pickupPlayerCollide,
      )
      checkCollisions(
        [player.sprite],
        enemies.pool.getAliveObjects(),
        playerEnemyCollide,
      )
    },
    render() {
      bullets.pool.render()
      pickups.pool.render()
      particles.pool.render()
      player.sprite.render()
      enemies.pool.render()
      store.render()
    },
  }
}
