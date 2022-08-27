import { onPointer } from 'kontra'
import { ShipSprite } from './sprite'

export const Player = ({ canvas, x: originX, y: originY, bullets, store }) => {
  let sprite = new ShipSprite({
    x: originX,
    y: originY,
    color: '#666',
    width: 25,
    height: 25,
  })
  sprite.health = 100

  onPointer('down', () => {
    if (store.getActive()) return
    if (canvas !== document.pointerLockElement) {
      canvas.requestPointerLock()
    } else {
      bullets.spawn({ x: sprite.x, y: sprite.y }, { x: 10, y: 10 })
    }
  })

  const moveCallback = (e) => {
    sprite.x += e.movementX / 6
    sprite.y += e.movementY / 6
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
