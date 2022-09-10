import { init, initPointer, GameLoop } from 'kontra'
import MUSIC from './music'
import { GameScene, MenuScene } from './scenes'
import './zzfx'

const { canvas } = init()

initPointer()

let scene

//@ts-ignore
zzfxP(...zzfxM(...MUSIC))

const startHelp = () => {
  scene && scene.shutdown()

  scene = MenuScene({
    canvas,
    heading: 'Help',
    description: 'help',
    button1: startGame,
  })
}

const startGame = () => {
  scene && scene.shutdown()

  scene = GameScene({ canvas, onWin: startWin })
}

const startMenu = () => {
  scene && scene.shutdown()
  scene = MenuScene({
    canvas,
    heading: 'JS13k2022',
    description: 'By Daniel Whiffing',
    button1: startGame,
    button2: startHelp,
  })
}

const startWin = () => {
  scene && scene.shutdown()
  scene = MenuScene({
    canvas,
    heading: 'Win',
    description: 'Win',
    button1: startGame,
  })
}

// startGame()
startMenu()

GameLoop({
  update: (...rest) => scene && scene.update(...rest),
  render: (...rest) => scene && scene.render(...rest),
}).start()
