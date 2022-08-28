import { angleToTarget, onPointer } from 'kontra'
import { getSpeed } from './enemy'
import { ShipSprite } from './sprite'

const PLAYER_SPEED = 4
const BULLET_STATS = {
  mine: {
    size: 3,
    triggerRadius: 45,
    triggerDuration: 300,
    explodeRadius: 35,
  },
  shot: {
    triggerRadius: 45,
    angle: ({ sprite }) => sprite.angle - 1.57,
    speed: ({ sprite }) => sprite.speed / 2,
    size: ({ dur }) => dur / 250,
  },
  blast: {
    triggerRadius: 45,
    ttl: 50,
    size: ({ dur }) => dur / 50,
  },
}
export const Player = ({ canvas, x: originX, y: originY, bullets, store }) => {
  let sprite = new ShipSprite({
    x: originX,
    y: originY,
    color: '#666',
    width: 25,
    height: 25,
  })
  sprite.health = 100
  let downDur = 0
  onPointer('down', (e) => (downDur = e.timeStamp))

  onPointer('up', (e) => {
    if (store.getActive()) return
    if (canvas !== document.pointerLockElement) {
      return canvas.requestPointerLock()
    }
    const dur = Math.min(3000, e.timeStamp - downDur)
    let opts = { x: sprite.x, y: sprite.y }
    let key
    if (dur < 250) {
      key = 'mine'
    } else if (sprite.speed > 3) {
      key = 'shot'
    } else {
      key = 'blast'
    }
    Object.entries(BULLET_STATS[key]).forEach(([k, v]) => {
      opts[k] = typeof v === 'function' ? v({ dur, sprite }) : v
    })
    bullets.spawn(opts)
  })

  const moveCallback = (e) => {
    sprite.speed = getSpeed(
      e.movementX / PLAYER_SPEED,
      e.movementY / PLAYER_SPEED,
    )
    if (sprite.speed > 0.2)
      sprite.angle = angleToTarget(sprite, {
        x: sprite.x + e.movementX / PLAYER_SPEED,
        y: sprite.y + e.movementY / PLAYER_SPEED,
      })

    sprite.x += e.movementX / PLAYER_SPEED
    sprite.y += e.movementY / PLAYER_SPEED
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
    damage() {
      sprite.health -= 10
      if (sprite.health <= 0) {
        sprite.die()
      }
    },
    shutdown() {
      document.removeEventListener('pointerlockchange', changeCallback, false)
    },
  }
}
