import { collides } from 'kontra'

// prettier-ignore
const SOUNDS = {
  enemyExplode: [.4,,208,,.05,.01,4,1.68,,-0.8,,,.01,,,.4,.15,.93,.01,.16],
  // enemyExplode: [.3,.5,902,.02,.01,.3,3,1.35,.8,.9,,,,1.1,,1,,.42,.17],
  mineExplode: [.4,.5,902,.01,.01,.15,3,1.35,.8,.9,,,,1,,.5,,.42,.1],
  minePlaced: [,,210,.01,.01,0,,.15,,.3,54,.11,,,100,,.02,.47,,.2],
  mineNotPlaced: [1.13,,1996,.02,.01,.01,1,1.81,-0.8,,14,.04,,,38,.1,,.11,.01],
  // mineNotPlaced: [2,,200,,.03,.04,1,.83,-7.1,,16,.1,,,-46,3,.05,.2,.03],
  playerHit: [2,,1050,.01,.01,.02,3,1.06,-66,,,.15,,,,,.05,.82,.01,.03],
  pickup: [1,,10,,.01,.01,,1.76,92,-1,,,,.6,-6.7,,,.42,.01],
  playerCharge: [.1,0,10,1.5,,.2,1,0,.1],
  playerChargeFull: [,,145,,,.14,1,.74,,,595,.03,,,,,.01,,.02,.03],
  playerShoot: [2,,1182,,.01,0,1,.43,-84,50,,,,,,,.14,.94,.08,.01],
  playerBlast: [1.13,,125,.01,,.01,3,1.93,-5.8,.8,,,,,,,.04,,.1,.08],
  hitWall: [,,219,,,.09,,,-0.1,-0.1,-50,-0.01,,-0.1,-1,.1],
  shieldHit: [1.99,,44,.01,.01,.02,1,2.07,,,-183,.09,,.2,-1.6,,.03,,.02,.05],
  playerWin: [1.66,,441,.06,.26,.34,,1.11,,,83,.05,.02,,,.1,.11,.42,.23],
  nextLevel: [2.01,,307,,.29,.3,1,.96,3.6,.1,332,.16,.2,,29,,.15,.46,.15],
  playerDie: [,,176,,,.31,,.85,-1.8,,,,,.2,,.3,,.76,.08],
  enemyShoot:[1.19,,453,,.09,.02,1,.21,-3.2,,,,,,,.1,.07,.97,.09,.05],
  // playerHit: [,,413,,,.22,4,2.99,.5,-0.7,,,,1,.3,.3,,.83,.04],
  // planetHit: [,,292,,.05,.11,,2.68,-3.4,,,,,.8,,.1,,.75,.06],
  // enemyHit: [1.05,,51,,,.21,,2.72,,,,,,.2,,.2,,.67,.03],
  click: [,,1768,,.01,.01,,.2,14,39,,,,,.5,.3,,.31,.01],
  // repair: [1.04,,186,.1,.03,.48,1,1.85,,,17,.08,.01,,,,,.91,,.01],
}

let muted = false
export const playSound = (key, volume: number = 0) =>
  !muted &&
  SOUNDS[key] &&
  // @ts-ignore
  zzfx(volume || SOUNDS[key][0], ...SOUNDS[key].slice(1))
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

export const checkCollisionsBool = (groupA, groupB) =>
  groupA.some((itemA) => groupB.some((itemB) => collides(itemA, itemB)))

export function gradient({ x = 0, y = 0, ctx, r2, r1, c1, c2 }) {
  ctx.rect(x, y, r2 * 2, r2 * 2)
  var g = ctx.createRadialGradient(x + r2, y + r2, r1, x + r2, y + r2, r2)
  g.addColorStop(0, c1)
  g.addColorStop(1, c2)
  ctx.fillStyle = g
  ctx.fill()
}

export const wrapNumber = (n, min, max) => {
  if (n > max) return n - max * 2
  if (n < min) return n + Math.abs(min) * 2
  return n
}

export const getSpeed = (x, y) => Math.sqrt(x * x + y * y)

export const distance = (a, b) =>
  Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
