import { angleToTarget, onPointer } from 'kontra'
import { BULLET_STATS, PLAYER_STATS, UPGRADES } from '../constants'
import { checkCollisionsBool, distance, getSpeed } from '../utils'
import { ShipSprite } from './sprite'

const MINE_CLICK_DURATION = 250
const BLAST_SPEED_THRESHOLD = 0.2
interface PlayerUpgrades {
  mine_count?: number
  mine_damage?: number
  mine_speed?: number
  charge_speed?: number
  charge_max?: number
  health_max?: number
  shield_max?: number
  shield_speed?: number
  shield_absorb?: number
  bullet_count?: number
}

export const Player = ({
  canvas,
  x: originX,
  y: originY,
  bullets,
  getStoreActive,
  enemies,
}) => {
  const {
    speed,
    maxCharge,
    size,
    maxMines,
    mineProximity,
    chargeRate,
    mineRate,
    health,
    shield,
    shieldChargeRate,
  } = PLAYER_STATS
  let sprite = new ShipSprite({
    x: originX,
    y: originY,
    color: '#666',
    width: size,
    height: size,
    health: health,
    maxHealth: health,
    charge: -2,
    maxCharge,
    mineDuration: 0,
    shield: shield,
  })
  const upgrades: PlayerUpgrades = {}
  UPGRADES.forEach((u) => {
    upgrades[u.key] = 0
  })
  const _dur = MINE_CLICK_DURATION
  let isDown = false
  onPointer('down', () => {
    isDown = true
  })

  onPointer('up', () => {
    isDown = false
    if (getStoreActive()) return
    if (canvas !== document.pointerLockElement) {
      return canvas.requestPointerLock()
    }
    const dur = Math.min(sprite.maxCharge * 100, sprite.charge * 100)
    sprite.charge = -2
    let opts = { x: sprite.x, y: sprite.y, enemies }
    let key = dur > _dur ? (sprite.speed > 3 ? 'shot' : 'blast') : 'mine'
    Object.entries(BULLET_STATS[key]).forEach(([k, v]) => {
      opts[k] = typeof v === 'function' ? v({ dur, sprite }) : v
    })

    if (key === 'mine') {
      const mines = bullets.pool.getAliveObjects().filter((b) => b.isMine)
      if (
        mines.length >= maxMines * (upgrades.mine_count + 1) ||
        mines.some((b) => b.position.distance(sprite) < mineProximity) ||
        sprite.mineDuration > 0
      )
        return

      sprite.mineDuration = 10
    }

    const bullet = bullets.spawn(opts)
    if (key === 'blast') {
      setTimeout(() => {
        bullet.triggered = true
        enemies.pool
          .getAliveObjects()
          .filter((e) => distance(e, bullet) < bullet.explodeRadius)
          .forEach((e: any) => {
            if (e.type !== 'absorber') {
              e.takeDamage(bullet.damage)
            } else {
              e.addCharge(bullet.damage)
            }
          })
      }, 100)
    }
  })

  const moveCallback = (e) => {
    let prevX = sprite.x
    let prevY = sprite.y
    sprite.speed = getSpeed(e.movementX / speed, e.movementY / speed)
    if (sprite.speed > BLAST_SPEED_THRESHOLD)
      sprite.angle = angleToTarget(sprite, {
        x: sprite.x + e.movementX / speed,
        y: sprite.y + e.movementY / speed,
      })
    if (!sprite.justDamaged) {
      sprite.x += e.movementX / speed
      sprite.y += e.movementY / speed
    }
    if (
      checkCollisionsBool(
        [sprite],
        enemies.pool.getAliveObjects().filter((e) => !e.spikey),
      )
    ) {
      sprite.x = prevX
      sprite.y = prevY
    }
  }

  const changeCallback = () => {
    if (canvas === document.pointerLockElement) {
      document.addEventListener('mousemove', moveCallback, false)
    } else {
      document.removeEventListener('mousemove', moveCallback, false)
    }
  }

  document.addEventListener('pointerlockchange', changeCallback, false)
  sprite.money = 10000
  sprite.getMoney = (amount) => {
    sprite.money += amount
  }
  return {
    sprite,
    upgrades,
    buyUpgrade(upgrade) {
      upgrades[upgrade.key] += 1
      console.log(upgrades)
      sprite.maxCharge = maxCharge * (upgrades.charge_max + 1)
    },
    update() {
      sprite.update()
      if (sprite.x < size / 2) sprite.x = size / 2
      if (sprite.x > canvas.width - size / 2) sprite.x = canvas.width - size / 2
      if (sprite.y < size / 2) sprite.y = size / 2
      if (sprite.y > canvas.height - size / 2)
        sprite.y = canvas.height - size / 2
      sprite.dx *= 0.7
      sprite.dy *= 0.7
      if (sprite.shield > 0) sprite.shield += shieldChargeRate
      if (isDown) sprite.charge += chargeRate * (upgrades.charge_speed + 1)
      if (sprite.mineDuration > 0)
        sprite.mineDuration -= mineRate * (upgrades.mine_speed + 1)
    },
    shutdown() {
      document.removeEventListener('pointerlockchange', changeCallback, false)
    },
  }
}
