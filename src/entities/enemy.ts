import { movePoint, angleToTarget } from 'kontra'
import { ShipSprite } from './sprite'

const size = 10
const maxSpeed = 3.8
const speed = 0.8
const turnRate = 0.08

export class Enemy extends ShipSprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(properties) {
    super.init({ color: '#f00', width: size, height: size, ...properties })
    this.target = properties.target
    this.pool = properties.pool
    this.particles = properties.particles
    this.angle = 0
    // particle timer
    this._p = 0
  }

  move(target) {
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
      if (otherEnemy === this || distance(this, otherEnemy) > 30) return
      this.dx += (this.x - otherEnemy.x) * 0.01
      this.dy += (this.y - otherEnemy.y) * 0.01
    })

    // enforce max speed
    let _maxSpeed = maxSpeed * (1 - Math.abs(rDelta) / Math.PI)
    const _speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
    this.dx = (this.dx / _speed) * _maxSpeed
    this.dy = (this.dy / _speed) * _maxSpeed
  }

  update() {
    super.update()
    if (this.target) this.move(this.target)
    if (this._p-- < 1) {
      this._p = 2
      this.particles.spawn(this.x + size / 2, this.y + size / 2)
    }
  }
}

const wrapNumber = (n, min, max) => {
  if (n > max) return n - max * 2
  if (n < min) return n + Math.abs(min) * 2
  return n
}

export const distance = (a, b) =>
  Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
