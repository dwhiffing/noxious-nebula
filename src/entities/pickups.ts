import { angleToTarget, movePoint, Pool, SpriteClass } from 'kontra'

export const Pickups = ({ canvas }) => {
  const pool = Pool({ create: () => new Pickup() })
  return {
    pool,
    spawn({ x, y, value, target }) {
      pool.get({ x, y, value, ttl: 400, target })
    },
  }
}

class Pickup extends SpriteClass {
  constructor(properties = {}) {
    super(properties)
  }

  init(props) {
    super.init(props)
    this.opacity = 1
  }

  die() {
    this.ttl = 0
  }

  update(props) {
    super.update(props)
    if (this.opacity > 0) {
      if (this.position.distance(this.target.position) < 50) {
        const pos = movePoint(
          this.position,
          angleToTarget(this, this.target),
          0.5,
        )
        this.dx = pos.x - this.position.x
        this.dy = pos.y - this.position.y
      } else {
        this.dx = 0
        this.dy = 0
      }
    }
  }

  draw() {
    if (this.ttl) this.opacity -= 1 / this.ttl
    this.context.fillStyle = `rgba(255,200,0,${this.opacity})`
    this.context.beginPath()
    this.context.arc(0, 0, 3.5, 0, 2 * Math.PI)
    this.context.fill()
  }
}
