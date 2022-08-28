export const LEVELS = [
  {
    waves: [{ type: 'spike', count: 10, rate: 100 }],
  },
  {
    waves: [{ type: 'base', count: 10, rate: 1000 }],
  },
  {
    waves: [{ type: 'base', count: 20, rate: 1000 }],
  },
  {
    waves: [{ type: 'base', count: 30, rate: 1000 }],
  },
]

interface EnemyStats {
  color: string
  size: number
  speed: number
  health: number
  damage: number
  turnRate?: number
  separateAmount?: number
  exhaust?: boolean
  collides?: boolean
  explodes?: boolean
  spikey?: boolean
  maxSpeed?: number
  friction?: number
  maxTargetDistance?: number
  minTargetDistance?: number
}

export const ENEMY_STATS: Record<string, EnemyStats> = {
  base: {
    color: '#f00',
    size: 20,
    exhaust: true,
    explodes: true,
    maxSpeed: 3.8,
    speed: 0.8,
    turnRate: 0.08,
    health: 10,
    damage: 10,
    separateAmount: 30,
  },
  big: {
    color: '#f00',
    exhaust: true,
    explodes: true,
    size: 30,
    maxSpeed: 2.8,
    speed: 0.5,
    turnRate: 0.04,
    health: 40,
    damage: 20,
    separateAmount: 30,
  },
  absorber: {
    color: '#ff0',
    friction: 0.2,
    size: 30,
    speed: 4,
    turnRate: 4,
    health: 15,
    damage: 20,
    separateAmount: 60,
    collides: true,
    exhaust: false,
    explodes: false,
    maxTargetDistance: 200,
    minTargetDistance: 100,
  },
  spike: {
    color: '#444',
    friction: 0.2,
    size: 30,
    speed: 4,
    health: 50,
    damage: 5,
    spikey: true,
    collides: true,
    exhaust: false,
    explodes: false,
  },
}

export const PLAYER_STATS = {
  mineClickDuration: 250,
  maxCharge: 3000,
  speed: 4,
  size: 30,
}
export const BULLET_STATS = {
  mine: {
    size: 4,
    triggerRadius: 45,
    triggerDuration: 300,
    explodeRadius: 50,
    isMine: true,
    damage: 10,
  },
  shot: {
    triggerRadius: 1,
    angle: ({ sprite }) => sprite.angle - 1.57,
    speed: ({ sprite }) => sprite.speed,
    size: ({ dur }) => dur / 250,
    damage: 10,
  },
  blast: {
    triggerRadius: 45,
    explodeRadius: 45,
    ttl: 30,
    size: ({ dur }) => dur / 50,
    damage: 10,
  },
}
