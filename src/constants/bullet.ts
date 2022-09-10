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
