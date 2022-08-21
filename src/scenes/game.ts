import { Scene } from 'kontra'
import { Enemies } from '../entities/enemies'
import { Player } from '../entities/player'

export const GameScene = ({ canvas, onWin }) => {
  let scene = Scene({ id: 'game' })
  let player = Player({ scene, x: 300, y: 300 })
  let enemies = Enemies(scene)
  scene.add(player.sprite)
  enemies.spawn(300, 100, player.sprite)

  return {
    shutdown() {
      player.shutdown()
    },
    update() {
      player.update()
      enemies.update()
      scene.update()
    },
    render() {
      scene.render()
    },
  }
}
