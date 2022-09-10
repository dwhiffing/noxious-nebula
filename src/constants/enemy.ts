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
  value?: number
  maxTargetDistance?: number
  minTargetDistance?: number
}

export const ENEMY_STATS: Record<string, EnemyStats> = {
  homer: {
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
    value: 10,
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
    value: 10,
  },
  defender: {
    color: '#0f0',
    friction: 0.2,
    size: 40,
    speed: 4,
    turnRate: 4,
    health: 15,
    damage: 20,
    separateAmount: 60,
    spikey: true,
    collides: true,
    exhaust: false,
    explodes: false,
    maxTargetDistance: 200,
    minTargetDistance: 100,
    value: 10,
  },
  absorber: {
    color: '#ff0',
    friction: 0.2,
    size: 25,
    speed: 5,
    turnRate: 4,
    health: 15,
    damage: 20,
    separateAmount: 40,
    collides: true,
    exhaust: false,
    explodes: false,
    maxTargetDistance: 100,
    minTargetDistance: 60,
    value: 10,
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
    value: 10,
  },
}
