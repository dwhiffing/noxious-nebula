import { collides } from 'kontra'

// prettier-ignore
const SOUNDS = {
  shoot: [2.05,,80,.04,.01,.09,1,.89,,,,,.07,,,,.03,.87,.04],
  teleport: [,,463,,.02,.17,,2.07,-7,,,,,.9,,.4,.03,.69,.01,.18],
  pickup: [.5,,1331,,.07,.21,,1.37,,,285,.07,.01,,,,.03,.8,.01],
  playerDie: [,,176,,,.31,,.85,-1.8,,,,,.2,,.3,,.76,.08],
  enemyDie: [2.06,,237,,.08,.12,4,2.54,-3,,,,,.6,,.5,.19,.79,.07,.04],
  playerHit: [,,413,,,.22,4,2.99,.5,-0.7,,,,1,.3,.3,,.83,.04],
  planetHit: [,,292,,.05,.11,,2.68,-3.4,,,,,.8,,.1,,.75,.06],
  enemyHit: [1.05,,51,,,.21,,2.72,,,,,,.2,,.2,,.67,.03],
  confirm: [1.01,,109,,.09,.29,1,.64,,,-532,.09,,,9.3,,,.72,.09],
  spawn: [3.28,,72,.01,.05,.06,,.84,.5,,,,.05,,154,,.1,.99,.04,.01],
  deny: [1.12,,59,,.03,.01,3,.13,,,,,,.1,-75,,,.04,.02],
  convert: [1.02,,178,.09,.45,.16,1,.71,,-2.3,79,.05,.11,,6.7,.1,,.72,.02],
  repair: [1.04,,186,.1,.03,.48,1,1.85,,,17,.08,.01,,,,,.91,,.01],
}

let muted = false
// @ts-ignore
export const playSound = (key) => !muted && SOUNDS[key] && zzfx(...SOUNDS[key])
export const toggleMute = () => (muted = !muted)

export const getDist = (source, target) => {
  const x = source.x - target.x
  const y = source.y - target.y
  return Math.sqrt(x * x + y * y)
}

export const checkCollisions = (groupA, groupB, onCollide) => {
  groupA.forEach((itemA) =>
    groupB.forEach((itemB) => {
      if (collides(itemA, itemB)) onCollide(itemA, itemB)
    }),
  )
}

export function gradient({ x = 0, y = 0, ctx, r2, r1, c1, c2 }) {
  ctx.rect(x, y, r2 * 2, r2 * 2)
  var g = ctx.createRadialGradient(x + r2, y + r2, r1, x + r2, y + r2, r2)
  g.addColorStop(0, c1)
  g.addColorStop(1, c2)
  ctx.fillStyle = g
  ctx.fill()
}
