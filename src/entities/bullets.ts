import { angleToTarget, movePoint, Pool } from 'kontra'
import { getSpeed, gradient } from '../utils'
import { Sprite } from './sprite'

const MAX_BULLETS = 50

export const Bullets = () => {
  let pool = Pool({ create: () => new Bullet(), maxSize: MAX_BULLETS })
  return {
    pool,
    spawn(opts) {
      const { health, speed = 0, angle = 0, enemies, isEnemyBullet } = opts
      return pool.get({
        x: opts.x,
        y: opts.y,
        anchor: { x: 0.5, y: 0.5 },
        width: opts.triggerRadius || opts.size || 0,
        height: opts.triggerRadius || opts.size || 0,
        dx: speed * Math.cos(angle),
        dy: speed * Math.sin(angle),
        size: opts.size || 0,
        innerSize: opts.innerSize,
        originalSize: opts.size || 0,
        explodeRadius: opts.explodeRadius || 0,
        triggerDuration: opts.triggerDuration || 0,
        isMine: opts.isMine || 0,
        ttl: opts.ttl || Infinity,
        triggered: false,
        damage: opts.damage,
        enemies,
        maxHealth: health,
        health,
        isEnemyBullet,
      })
    },
  }
}

class Bullet extends Sprite {
  constructor(properties = {}) {
    super(properties)
  }

  init(props) {
    super.init(props)
    this.opacity = 1
  }

  takeDamage(amount) {
    super.takeDamage(amount)
    const f = Math.max((this.health / this.maxHealth) * this.originalSize, 0)
    this.size = f
    this.width = f
    this.height = f
  }

  update() {
    super.update()
    // home in on nearby enemies
    if (this.dx !== 0 && this.dy !== 0 && this.enemies) {
      const first = this.enemies.pool
        .getAliveObjects()
        .filter(
          (e) =>
            e.position.distance(this) < (e.type === 'absorber' ? 200 : 100),
        )
        .sort(
          (a, b) => a.position.distance(this) - b.position.distance(this),
        )[0]
      if (first) {
        const angle = angleToTarget(this, first)
        const distanceFactor =
          this.position.distance(first.position) /
          (first.type === 'absorber' ? 10 : 50)
        const p = movePoint({ x: 0, y: 0 }, angle, distanceFactor)
        this.dx += p.x
        this.dy += p.y

        // max speed
        const maxSpeed = 10
        const s = getSpeed(this.dx, this.dy)
        this.dx = (this.dx / s) * maxSpeed
        this.dy = (this.dy / s) * maxSpeed
      }
    }

    if (this.x < 0 || this.y < 0 || this.x > 900 || this.y > 900) this.ttl = 0
  }

  draw() {
    if (this.ttl) this.opacity -= 1 / this.ttl
    const size = this.size
    let r = 120
    let g = 120
    let b = 120
    if (this.isMine) {
      r = 10
      g = 150
      b = 250
    }
    if (this.isEnemyBullet || (this.isMine && this.triggered)) {
      r = 250
      g = 0
      b = 0
    }
    if (!this.isMine && !this.isEnemyBullet) {
      b = 250
      g = 250
      r = 0
    }
    let c1 = `rgba(${r},${g},${b},${this.opacity})`
    let c2 = `rgba(${r},${g},${b},0)`
    gradient({
      x: this.width / 2 - size,
      y: this.width / 2 - size,
      ctx: this.context,
      r1: Math.max(0, this.innerSize || this.width / 2),
      r2: Math.max(0, size),
      c1,
      c2,
    })
    if (this.isMine) {
      this.context.beginPath()
      this.context.fillStyle = '#b00'
      this.context.arc(this.width / 2, this.width / 2, 2, 0, 2 * Math.PI)
      this.context.closePath()
      this.context.fill()
    }
  }
}
