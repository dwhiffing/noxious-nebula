import { movePoint, angleToTarget } from 'kontra'
import { ShipSprite } from './sprite'

const speed = 0.5
const maxSpeed = 4
const turnRate = 0.08

export class Enemy extends ShipSprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(properties) {
    super.init({ color: '#f00', width: 20, height: 20, ...properties })
    this.target = properties.target
    this.pool = properties.pool
  }

  move(target) {
    // rotate toward target
    let angle = angleToTarget(this, target)
    const rDelta = wrapNumber(angle - this.rotation, -Math.PI, Math.PI)
    this.rotation += rDelta > 0 ? turnRate : -turnRate
    if (Math.abs(rDelta) < turnRate) this.rotation = angle

    // move toward facing angle
    const pos = movePoint({ x: this.dx, y: this.dy }, this.rotation, speed)
    this.dx += pos.x
    this.dy += pos.y

    // separate from others
    this.pool.getAliveObjects().forEach((otherEnemy: any) => {
      if (otherEnemy === this || distance(this, otherEnemy) > 50) return
      this.dx += (this.x - otherEnemy.x) * 0.01
      this.dy += (this.y - otherEnemy.y) * 0.01
    })

    // enforce max speed
    const _speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
    this.dx = (this.dx / _speed) * maxSpeed
    this.dy = (this.dy / _speed) * maxSpeed
  }

  update() {
    if (this.target) this.move(this.target)
    super.update()
  }
}

const wrapNumber = (n, min, max) => {
  if (n > max) return n - max * 2
  if (n < min) return n + Math.abs(min) * 2
  return n
}

const distance = (a, b) =>
  Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
