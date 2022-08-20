import { Scene } from 'kontra'
import { Player } from '../entities'

export const GameScene = ({ canvas, onWin }) => {
  let scene = Scene({ id: 'game' })
  let player = Player({ scene, x: 30, y: 30 })
  scene.add(player.sprite)

  return {
    shutdown() {},
    update() {
      player.update()
      scene.update()
      scene.lookAt({ x: player.sprite.x, y: player.sprite.y })
    },
    render() {
      scene.render()
    },
  }
}
