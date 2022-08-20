import { init, Sprite, GameLoop } from 'kontra'

let { canvas } = init()
let sprite = Sprite({
  x: 100,
  y: 80,
  color: 'red',
  width: 20,
  height: 40,
  dx: 2,
})

let loop = GameLoop({
  update: function () {
    sprite.update()
    if (sprite.x > canvas.width) {
      sprite.x = -sprite.width
    }
  },
  render: function () {
    sprite.render()
  },
})

loop.start()
