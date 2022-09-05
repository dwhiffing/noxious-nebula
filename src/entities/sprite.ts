import { movePoint, SpriteClass } from 'kontra'

export class Sprite extends SpriteClass {
  constructor(properties) {
    super(properties)
  }

  takeDamage(n) {
    if (this.health <= 0) return
    if (this.shield > 0) {
      if (n > this.shield) {
        n -= this.shield
        this.shield = 0
      } else {
        this.shield -= n
        n = 0
      }
    }
    if (n > 0) this.health -= n
    if (this.health <= 0) this.die()
    this.justDamaged = true
    setTimeout(() => (this.justDamaged = false), 100)
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
  }

  draw() {
    this.strobeTimer--
    const w = this.width * 0.6
    const o = this.width / 2

    // base circle
    this.context.lineWidth = 3
    this.context.strokeStyle = '#222'
    this.context.fillStyle = '#999'
    this.context.beginPath()
    this.context.moveTo(o, o)
    this.context.arc(o, o, w, 0, 2 * Math.PI)
    this.context.closePath()
    this.context.stroke()
    this.context.fill()

    // health
    this.context.beginPath()
    this.context.moveTo(o, o)
    this.context.fillStyle = this.color
    const f = 360 * (this.health / this.maxHealth)
    this.context.arc(o, o, w, getRads(-90), getRads(f - 90))
    this.context.closePath()
    this.context.fill()

    // inner circle
    this.context.lineWidth = 1
    this.context.strokeStyle = '#555'
    this.context.fillStyle = '#111'
    this.context.beginPath()
    this.context.arc(o, o, w / 2, 0, 2 * Math.PI)
    this.context.closePath()
    this.context.stroke()
    this.context.fill()

    // energy
    this.context.beginPath()
    this.context.moveTo(o, o)
    this.context.fillStyle = '#0ff'
    const c = this.charge > 0 ? this.charge : 0
    const f2 = 360 * (c / this.maxCharge)
    this.context.arc(o, o, w / 2, getRads(-90), getRads(f2 - 90))
    this.context.closePath()
    this.context.fill()

    // energy
    if (this.shield > 0) {
      this.context.beginPath()
      this.context.lineWidth = 3
      this.context.strokeStyle = `rgba(0,200,0,${this.shield / 100})`
      this.context.arc(o, o, w + 6, getRads(-90), getRads(360 - 90))
      this.context.closePath()
      this.context.stroke()
    }

    // debug line
    this.context.lineWidth = 1
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

function getRads(degrees) {
  return (Math.PI * degrees) / 180
}
