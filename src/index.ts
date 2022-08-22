import { init, initPointer, GameLoop } from 'kontra'
import { GameScene, MenuScene, WinScene } from './scenes'
import './zzfx'

const { canvas } = init()

initPointer()

let scene

const startGame = () => {
  scene && scene.shutdown()
  scene = GameScene({ canvas, onWin: startWin })
}

const startMenu = () => {
  scene && scene.shutdown()
  scene = MenuScene({ canvas, onNew: startGame })
}

const startWin = () => {
  scene && scene.shutdown()
  scene = WinScene({ canvas, onNew: startGame })
}

startGame()
// startMenu()

GameLoop({
  update: (...rest) => scene && scene.update(...rest),
  render: (...rest) => scene && scene.render(...rest),
}).start()
