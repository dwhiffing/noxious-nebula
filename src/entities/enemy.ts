import { movePoint, angleToTarget } from 'kontra'
import { distance, getSpeed, wrapNumber } from '../utils'
import { ENEMY_STATS } from '../constants'
import { ShipSprite } from './sprite'

const SEP_AMOUNT = 30
const SEP_FACTOR = 0.01

export class Enemy extends ShipSprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(properties) {
    const stats = ENEMY_STATS[properties.type || 'base']
    super.init({
      color: stats.color,
      width: stats.size,
      height: stats.size,
      health: stats.health,
      maxHealth: stats.health,
      ...stats,
      ...properties,
    })
    this.target = properties.target
    // TODO: set a random duration for each enemy, when the duration is reached, stop updating targetPos, sleep for a random duration. then wake up
    this.targetPos = this.target ? { x: this.target.x, y: this.target.y } : null
    this.pool = properties.pool
    this.particles = properties.particles
    this.angle = 0
    this.exhaustTimer = 0
  }

  move(target) {
    const { maxSpeed, speed, turnRate } = ENEMY_STATS[this.type]

    // rotate toward target
    let angle = angleToTarget(this, target)
    const rDelta = wrapNumber(angle - this.angle, -Math.PI, Math.PI)
    if (Math.abs(rDelta) < turnRate) {
      this.angle = angle
    } else {
      this.angle += rDelta > 0 ? turnRate : -turnRate
    }
    this.angle = wrapNumber(this.angle, -Math.PI, Math.PI)

    // move toward facing angle
    const pos = movePoint(this.position, this.angle, speed)
    this.dx += pos.x - this.position.x
    this.dy += pos.y - this.position.y

    // separate from others
    this.pool.getAliveObjects().forEach((otherEnemy: any) => {
      if (otherEnemy === this || distance(this, otherEnemy) > SEP_AMOUNT) return
      this.dx += (this.x - otherEnemy.x) * SEP_FACTOR
      this.dy += (this.y - otherEnemy.y) * SEP_FACTOR
    })

    // enforce max speed
    let _maxSpeed = maxSpeed * (1 - Math.abs(rDelta) / Math.PI)
    const _speed = getSpeed(this.dx, this.dy)
    this.dx = (this.dx / _speed) * _maxSpeed
    this.dy = (this.dy / _speed) * _maxSpeed
  }

  update() {
    super.update()

    this.targetPos = this.target ? { x: this.target.x, y: this.target.y } : null
    if (this.targetPos) this.move(this.targetPos)

    // draw exhaust
    if (this.exhaustTimer-- < 1) {
      const size = ENEMY_STATS[this.type || 'base'].size
      this.exhaustTimer = Math.floor(size / 10)
      this.particles.spawn({
        x: this.x + size / 2,
        y: this.y + size / 2,
        size: size / 3,
        ttl: 10 + Math.floor(size / 1.2),
        opacity: 0.5,
      })
    }
  }

  die() {
    const size = ENEMY_STATS[this.type || 'base'].size

    // draw explosion
    this.particles.spawn({
      x: this.x + size / 2,
      y: this.y + size / 2,
      size,
      ttl: 20,
    })
    super.die()
  }
}
