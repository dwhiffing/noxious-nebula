import { angleToTarget, onPointer } from 'kontra'
import { BULLET_STATS, PLAYER_STATS } from '../constants'
import { getSpeed } from '../utils'
import { ShipSprite } from './sprite'

const MINE_CLICK_DURATION = 250
const BLAST_SPEED_THRESHOLD = 0.2

export const Player = ({ canvas, x: originX, y: originY, bullets, store }) => {
  const { speed, maxCharge, size } = PLAYER_STATS
  let sprite = new ShipSprite({
    x: originX,
    y: originY,
    color: '#666',
    width: size,
    height: size,
  })
  sprite.health = 100
  let downDur = 0
  const _dur = MINE_CLICK_DURATION
  onPointer('down', (e) => (downDur = e.timeStamp))

  onPointer('up', (e) => {
    if (store.getActive()) return
    if (canvas !== document.pointerLockElement) {
      return canvas.requestPointerLock()
    }
    const dur = Math.min(maxCharge, e.timeStamp - downDur)
    let opts = { x: sprite.x, y: sprite.y }
    let key = dur > _dur ? (sprite.speed > 3 ? 'shot' : 'blast') : 'mine'
    Object.entries(BULLET_STATS[key]).forEach(([k, v]) => {
      opts[k] = typeof v === 'function' ? v({ dur, sprite }) : v
    })
    bullets.spawn(opts)
  })

  const moveCallback = (e) => {
    sprite.speed = getSpeed(e.movementX / speed, e.movementY / speed)
    if (sprite.speed > BLAST_SPEED_THRESHOLD)
      sprite.angle = angleToTarget(sprite, {
        x: sprite.x + e.movementX / speed,
        y: sprite.y + e.movementY / speed,
      })

    sprite.x += e.movementX / speed
    sprite.y += e.movementY / speed
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
    shutdown() {
      document.removeEventListener('pointerlockchange', changeCallback, false)
    },
  }
}
