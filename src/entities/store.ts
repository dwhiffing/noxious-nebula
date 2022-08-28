import { Text, Sprite, track } from 'kontra'

export const Store = ({ canvas, onNext }) => {
  let active = false
  const background = Sprite({
    x: canvas.width / 2 - 250,
    y: 50,
    width: 500,
    height: 400,
    color: '#555',
  })
  let buttons = []
  for (let i = 0; i < 8; i++) {
    const text = Text({
      x: canvas.width / 2 - 200 + 55 * i,
      y: 200,
      text: 'Upgrade',
      color: 'white',
      font: '12px sans-serif',
      anchor: { x: 0.5, y: 0.5 },
      onDown() {},
    })
    track(text)
    buttons.push(text)
  }

  const text = Text({
    x: canvas.width / 2,
    y: 400,
    text: 'Start',
    color: 'white',
    font: '12px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
    onDown() {
      active = false
      canvas.requestPointerLock()
      onNext()
    },
  })
  track(text)
  buttons.push(text)

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
