import { Text, track } from 'kontra'

export const MenuScene = ({
  canvas,
  heading,
  description,
  button1,
  button2,
}: any) => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  let text = Text({
    text: heading,
    font: '80px sans-serif',
    color: '#555',
    x: width / 2,
    y: height / 2 - 180,
    anchor: { x: 0.5, y: 0.5 },
  })
  let text2 = Text({
    text: description,
    font: '18px sans-serif',
    color: '#444',
    x: width / 2,
    y: height / 2 - 120,
    anchor: { x: 0.5, y: 0.5 },
  })
  let button = Text({
    x: width / 2,
    y: height / 2 + 150,
    text: 'Start',
    color: 'white',
    font: '40px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
    onDown: button1,
  })
  track(button)
  let helpButton
  if (button2) {
    helpButton = Text({
      x: width / 2,
      y: height / 2 + 200,
      text: 'Help',
      color: 'white',
      font: '40px sans-serif',
      anchor: { x: 0.5, y: 0.5 },
      onDown: button2,
    })
    track(helpButton)
  }

  return {
    shutdown() {},
    update() {},
    render() {
      text.render()
      text2.render()
      button.render()
      helpButton?.render()
    },
  }
}
