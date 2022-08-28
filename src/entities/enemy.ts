import { movePoint, angleToTarget, randInt } from 'kontra'
import { checkCollisionsBool, distance, getSpeed, wrapNumber } from '../utils'
import { ENEMY_STATS } from '../constants'
import { ShipSprite } from './sprite'

export class Enemy extends ShipSprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(properties) {
    const stats = ENEMY_STATS[properties.type || 'base']
    super.init({
      width: stats.size,
      height: stats.size,
      maxHealth: stats.health,
      ...stats,
      ...properties,
    })
    this.targetPos = this.target ? { x: this.target.x, y: this.target.y } : null
    this.angle = 0
    this.exhaustTimer = 0
    // TODO: set a random duration for each enemy, when the duration is reached, stop updating targetPos, sleep for a random duration. then wake up
  }

  move(target) {
    const {
      maxSpeed,
      speed,
      turnRate,
      friction,
      separateAmount,
      maxTargetDistance,
      minTargetDistance,
    } = ENEMY_STATS[this.type]

    let prevX = this.x
    let prevY = this.y
    let speedMulti = 1

    // rotate toward target
    let rDelta = this.angle
    if (turnRate) {
      let angle = angleToTarget(this, target)
      rDelta = wrapNumber(angle - this.angle, -Math.PI, Math.PI)
      if (Math.abs(rDelta) < turnRate) {
        this.angle = angle
      } else {
        this.angle += rDelta > 0 ? turnRate : -turnRate
      }
    } else {
      const rand = randInt(-100, 100) / 100
      // TODO: should bounce instead of a random new angle if not spawning
      if (this.x > 740 - this.width) this.angle = Math.PI / -2 + rand
      if (this.x < 0) this.angle = Math.PI / 2 + rand
      if (this.y > 540 - this.width) this.angle = 0 + rand
      if (this.y < 0) this.angle = Math.PI + rand
    }

    // move closer/further/hold position based on distance to target
    if (maxTargetDistance) {
      const dist = distance(this, target)
      if (dist < maxTargetDistance) {
        speedMulti = 0
        if (minTargetDistance && dist < minTargetDistance) {
          speedMulti = 1
          this.angle += Math.PI
        }
      }
    }

    this.angle = wrapNumber(this.angle, -Math.PI, Math.PI)

    // move toward facing angle
    const pos = movePoint(this.position, this.angle, speed * speedMulti)
    this.dx += pos.x - this.position.x
    this.dy += pos.y - this.position.y

    // apply friction to non missiles
    if (friction) {
      this.dx *= friction
      this.dy *= friction
    }

    // separate from others
    if (separateAmount) {
      this.pool.getAliveObjects().forEach((otherEnemy: any) => {
        if (otherEnemy === this || distance(this, otherEnemy) > separateAmount)
          return
        this.dx += (this.x - otherEnemy.x) * 0.02
        this.dy += (this.y - otherEnemy.y) * 0.02
      })
    }

    // enforce max speed
    if (maxSpeed) {
      let _maxSpeed = maxSpeed * (1 - Math.abs(rDelta) / Math.PI)
      const _speed = getSpeed(this.dx, this.dy)
      this.dx = (this.dx / _speed) * _maxSpeed
      this.dy = (this.dy / _speed) * _maxSpeed
    }

    // separate from player
    if (this.collides && checkCollisionsBool([this], [this.target])) {
      this.dx = 0
      this.dy = 0
      this.x = prevX
      this.y = prevY
    }
  }

  update() {
    super.update()

    this.targetPos = this.target ? { x: this.target.x, y: this.target.y } : null
    if (this.targetPos) this.move(this.targetPos)

    // draw exhaust
    if (!this.exhaust) return
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
