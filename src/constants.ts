export const LEVELS = [
  {
    waves: [{ type: 'big', count: 5, rate: 1000 }],
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

export const ENEMY_STATS = {
  base: {
    color: '#f00',
    size: 20,
    maxSpeed: 3.8,
    speed: 0.8,
    turnRate: 0.08,
    health: 10,
    maxHealth: 10,
    damage: 10,
  },
  big: {
    color: '#f00',
    size: 30,
    maxSpeed: 2.8,
    speed: 0.5,
    turnRate: 0.04,
    health: 40,
    maxHealth: 40,
    damage: 20,
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
    explodeRadius: 35,
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
