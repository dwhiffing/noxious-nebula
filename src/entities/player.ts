import { angleToTarget, onPointer } from 'kontra'
import { BULLET_STATS, PLAYER_STATS } from '../constants'
import { checkCollisionsBool, getSpeed } from '../utils'
import { ShipSprite } from './sprite'

const MINE_CLICK_DURATION = 250
const BLAST_SPEED_THRESHOLD = 0.2

export const Player = ({
  canvas,
  x: originX,
  y: originY,
  bullets,
  store,
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
    chargeDuration: -2,
    mineDuration: 0,
    shield: shield,
  })
  const _dur = MINE_CLICK_DURATION
  let isDown = false
  onPointer('down', () => {
    isDown = true
  })

  onPointer('up', () => {
    isDown = false
    if (store.getActive()) return
    if (canvas !== document.pointerLockElement) {
      return canvas.requestPointerLock()
    }
    const dur = Math.min(maxCharge, sprite.chargeDuration * 100)
    sprite.chargeDuration = -2
    let opts = { x: sprite.x, y: sprite.y }
    let key = dur > _dur ? (sprite.speed > 3 ? 'shot' : 'blast') : 'mine'
    Object.entries(BULLET_STATS[key]).forEach(([k, v]) => {
      opts[k] = typeof v === 'function' ? v({ dur, sprite }) : v
    })

    if (key === 'mine') {
      const mines = bullets.pool.getAliveObjects().filter((b) => b.isMine)
      if (
        mines.length >= maxMines ||
        mines.some((b) => b.position.distance(sprite) < mineProximity) ||
        sprite.mineDuration > 0
      )
        return

      sprite.mineDuration = 10
    }

    const bullet = bullets.spawn(opts)
    if (key === 'blast') setTimeout(() => (bullet.triggered = true), 50)
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

  return {
    sprite,
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
      if (isDown) sprite.chargeDuration += chargeRate
      if (sprite.mineDuration > 0) sprite.mineDuration -= mineRate
    },
    shutdown() {
      document.removeEventListener('pointerlockchange', changeCallback, false)
    },
  }
}
