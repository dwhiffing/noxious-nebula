import { movePoint, SpriteClass } from 'kontra'

export class Sprite extends SpriteClass {
  constructor(properties) {
    super(properties)
  }

  damage(n) {
    if (this.health <= 0) return
    this.health -= n
    if (this.health <= 0) {
      this.die()
    }
  }

  die() {
    this.ttl = 0
    this.opacity = this.isAlive() ? 1 : 0
  }

  update() {
    super.update()
  }

  render() {
    super.render()
  }
}

export class ShipSprite extends Sprite {
  constructor(properties) {
    super({ anchor: { x: 0.5, y: 0.5 }, ...properties })
    // this.strobeTimer = 10
  }

  draw() {
    this.strobeTimer--
    const w = this.width * 0.6
    // const pad = 1.25 + (this.strobeTimer <= 5 ? 0.08 : 0.05)
    // if (this.strobeTimer <= 0) this.strobeTimer = 10
    const o = this.width / 2
    // gradient({
    //   x: o + -w * pad,
    //   y: o + -w * pad,
    //   ctx: this.context,
    //   r1: w * 0.5,
    //   r2: w * pad,
    //   c1: 'rgba(170,170,255,1)',
    //   c2: 'rgba(170,170,255,0)',
    // })
    this.context.fillStyle = this.color
    this.context.lineWidth = 3
    this.context.strokeStyle = '#222'
    this.context.beginPath()
    this.context.arc(o, o, w, 0, 2 * Math.PI)
    this.context.closePath()
    this.context.stroke()
    this.context.fill()
    this.context.beginPath()
    this.context.fillStyle = '#111'
    this.context.arc(o, o, w / 2, 0, 2 * Math.PI)
    this.context.fill()
    this.context.lineWidth = 1
    this.context.strokeStyle = '#555'
    this.context.stroke()
    this.context.closePath()

    // debug line
    this.context.strokeStyle = '#0f0'

    const p = movePoint(
      { x: this.width / 2, y: this.width / 2 },
      this.angle || 0,
      10,
    )
    this.context.beginPath()
    this.context.moveTo(this.width / 2, this.width / 2)
    this.context.lineTo(p.x, p.y)
    this.context.stroke()
  }
}
