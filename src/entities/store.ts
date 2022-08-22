import { Button, Sprite } from 'kontra'

export const Store = ({ scene, onNext }) => {
  let active = false
  const background = Sprite({
    x: 50,
    y: 50,
    width: 500,
    height: 500,
    color: '#555',
  })
  let buttons = []
  for (let i = 0; i < 8; i++) {
    buttons.push(
      Button({
        x: 100 + 55 * i,
        y: 200,
        text: {
          text: 'Upgrade',
          color: 'white',
          font: '12px sans-serif',
          anchor: { x: 0.5, y: 0.5 },
        },
        onDown() {},
      }),
    )
  }

  buttons.push(
    Button({
      x: 300,
      y: 400,
      text: {
        text: 'Start',
        color: 'white',
        font: '12px sans-serif',
        anchor: { x: 0.5, y: 0.5 },
      },
      onDown() {
        active = false
        scene.context.canvas.requestPointerLock()
        onNext()
      },
    }),
  )

  return {
    update() {
      if (!active) return
      background.update()
    },
    getActive() {
      return active
    },
    setActive(_active) {
      active = _active
      if (active) document.exitPointerLock()
    },
    render() {
      if (!active) return
      background.render()
      buttons.forEach((b) => b.render())
    },
  }
}
