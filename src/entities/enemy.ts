import { movePoint, angleToTarget } from 'kontra'
import { ShipSprite } from './sprite'

const speed = 0.001

export class Enemy extends ShipSprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(properties) {
    super.init({ color: '#f00', width: 20, height: 20, ...properties })
    this.target = properties.target
  }

  move(target) {
    const angle = angleToTarget(this, target)
    const pos = movePoint({ x: this.ddx, y: this.ddy }, angle, speed)
    this.ddx = pos.x
    this.ddy = pos.y
    this.dy *= 0.95
    this.dx *= 0.95
  }

  update() {
    if (this.target) this.move(this.target)
    super.update()
  }
}
