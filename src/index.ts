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
    heading: 'How to play',
    texts: [
      'Move your mouse to control your bot.\n\nClick to drop a mine or hold to charge up energy.\n\nRelease energy while moving to fire a homing blast\nor while stationary for a burst around you',
      "You can only place a few mines at once to start\n\nMines won't explode if you are too close\n\nMines must be placed at least a few feet apart",
      'Use mines and energy to destroy your enemies\n\nPick up the money they drop and upgrade your bot between levels\n\nTry to make it through all the waves!',
      'Red enemies will home in on you and explode\n\nGreen enemies are immune to mines, but vulnerable to energy.\nThey can shield nearby foes from mines\n\nYellow enemies can absorb your blasts, but are weak to mines and bursts\n\nGray enemies will bounce around and damage you if you touch them.\nThey are tough to kill',
    ],
    button1: startGame,
  })
}

const startGame = () => {
  scene && scene.shutdown()
  scene = GameScene({ canvas, onWin: startWin, onLose: startLose })
}

const startMenu = () => {
  scene && scene.shutdown()
  scene = MenuScene({
    canvas,
    heading: 'Noxious Nebula',
    description: `Created by Daniel Whiffing\nOriginal concept by zauron.net`,
    button1: startGame,
    button2: startHelp,
  })
}

const startWin = () => {
  document.exitPointerLock()
  scene && scene.shutdown()
  scene = MenuScene({
    canvas,
    heading: 'Win',
    description: 'Win',
    button1: startGame,
  })
}

const startLose = () => {
  document.exitPointerLock()
  scene && scene.shutdown()
  scene = MenuScene({
    canvas,
    heading: 'Game over',
    description: 'you lose',
    button1: startGame,
  })
}

// startGame()
startMenu()

GameLoop({
  update: (...rest) => scene && scene.update(...rest),
  render: (...rest) => scene && scene.render(...rest),
}).start()
