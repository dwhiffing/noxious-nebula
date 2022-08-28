import { angleToTarget, onPointer } from 'kontra'
import { getSpeed } from './enemy'
import { ShipSprite } from './sprite'

const _m = 4
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
    if (dur < 250) {
      bullets.spawn({ x: sprite.x, y: sprite.y })
    } else if (sprite.speed > 3) {
      bullets.spawn({
        x: sprite.x,
        y: sprite.y,
        size: dur / 250,
        triggerDuration: 0,
        speed: sprite.speed / 2,
        explodeRadius: 0,
        angle: sprite.angle - 1.57,
      })
    } else {
      bullets.spawn({
        x: sprite.x,
        y: sprite.y,
        size: dur / 50,
        speed: 0,
        triggerDuration: 0,
        explodeRadius: 0,
        opacityDecay: 0.05,
        ttl: 50,
      })
    }
  })

  const moveCallback = (e) => {
    sprite.speed = getSpeed(e.movementX / _m, e.movementY / _m)
    if (sprite.speed > 0.2)
      sprite.angle = angleToTarget(sprite, {
        x: sprite.x + e.movementX / _m,
        y: sprite.y + e.movementY / _m,
      })

    sprite.x += e.movementX / _m
    sprite.y += e.movementY / _m
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
