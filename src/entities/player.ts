import { ShipSprite } from './sprite'

export const Player = ({ scene, x: originX, y: originY }) => {
  const { width, height } = scene.context.canvas
  let sprite = new ShipSprite({
    x: originX,
    y: originY,
    anchor: { x: 0.5, y: 0.5 },
    color: '#666',
    width: 50,
    height: 50,
  })

  return {
    sprite,
    shutdown() {},
    update() {
      sprite.ddx = 0
      sprite.ddy = 0
      sprite.update()
    },
  }
}
