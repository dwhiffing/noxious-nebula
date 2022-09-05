export const LEVELS = [
  { waves: [{ type: 'homer', count: 15, rate: 2000 }] },
  { waves: [{ type: 'homer', count: 30, rate: 800 }] },
  { waves: [{ type: 'defender', count: 8, rate: 1000 }] },
  {
    waves: [
      { type: 'defender', count: 8, rate: 0 },
      { type: 'homer', count: 8, rate: 1000, delay: 5000 },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 12, rate: 1000, circular: true },
      { type: 'homer', count: 8, rate: 1000, delay: 5000 },
    ],
  },
  { waves: [{ type: 'absorber', count: 8, delay: 10, rate: 1000 }] },
  {
    waves: [
      { type: 'defender', count: 8, delay: 10, rate: 1000 },
      { type: 'absorber', count: 8, delay: 10, rate: 1000 },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 8, delay: 10, rate: 1000 },
      { type: 'absorber', count: 8, delay: 10, rate: 1000 },
      { type: 'homer', count: 8, delay: 10, rate: 1000 },
    ],
  },
  { waves: [{ type: 'spike', count: 16, rate: 1000 }] },
]
export const UPGRADES = [
  {
    description: (n: number) => `Lay more mines at once`,
    key: 'mine_count',
    label: 'More mines',
    cost: [100, 200],
  },
  {
    description: (n: number) =>
      `Mines have larger explosions and do more damage`,
    key: 'mine_damage',
    label: 'Bigger mines',
    cost: [100],
  },
  {
    description: (n: number) => `Lay mines faster`,
    key: 'mine_speed',
    label: 'Faster mines',
    cost: [100],
  },
  {
    description: (n: number) => `Charge energy faster`,
    key: 'charge_speed',
    label: 'Faster charge',
    cost: [100],
  },
  {
    description: (n: number) => `Charge more energy before max`,
    key: 'charge_max',
    label: 'More charge',
    cost: [100],
  },
  {
    description: (n: number) => `More health`,
    key: 'health_max',
    label: 'More HP',
    cost: [],
  },
  {
    description: (n: number) => `More shield`,
    key: 'shield_max',
    label: 'More shield',
    cost: [],
  },
  {
    description: (n: number) => `Gain shield faster`,
    key: 'shield_speed',
    label: 'Faster shield',
    cost: [],
  },
  {
    description: (n: number) => `Description`,
    key: 'shield_absorb',
    label: 'Absorb',
    cost: [],
  },
  {
    description: (n: number) => `Description`,
    key: 'bullet_count',
    label: 'More bullets',
    cost: [],
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

export const PLAYER_STATS = {
  mineClickDuration: 250,
  speed: 4,
  size: 30,
  maxMines: 5,
  mineProximity: 20,
  chargeRate: 0.16,
  maxCharge: 30,
  mineRate: 0.2,
  health: 100,
  shield: 0,
  shieldChargeRate: 0.1,
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
    health: ({ dur }) => dur / 80,
    damage: 10,
  },
  blast: {
    triggerRadius: 45,
    ttl: 30,
    explodeRadius: ({ dur }) => dur / 30,
    size: ({ dur }) => dur / 40,
    damage: ({ dur }) => dur / 200,
  },
}
