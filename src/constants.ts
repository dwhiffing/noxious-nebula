export const LEVELS = [
  {
    waves: [{ type: 'base', count: 5, rate: 1000 }],
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
    size: 15,
    maxSpeed: 3.8,
    speed: 0.8,
    turnRate: 0.08,
    damage: 10,
  },
}

export const PLAYER_STATS = {
  mineClickDuration: 250,
  maxCharge: 3000,
  speed: 4,
}
export const BULLET_STATS = {
  mine: {
    size: 3,
    triggerRadius: 45,
    triggerDuration: 300,
    explodeRadius: 35,
  },
  shot: {
    triggerRadius: 45,
    angle: ({ sprite }) => sprite.angle - 1.57,
    speed: ({ sprite }) => sprite.speed,
    size: ({ dur }) => dur / 250,
  },
  blast: {
    triggerRadius: 45,
    ttl: 50,
    size: ({ dur }) => dur / 50,
  },
}
