import { Button, Text } from 'kontra'

export const WinScene = ({ canvas, onNew }) => {
  const { width, height } = canvas
  let text = Text({
    text: 'You win!',
    font: '110px sans-serif',
    color: '#555',
    x: width / 2,
    y: height / 2 - 180,
    anchor: { x: 0.5, y: 0.5 },
  })
  let button = Button({
    x: width / 2,
    y: height / 2 + 150,
    text: {
      text: 'Start',
      color: 'white',
      font: '40px sans-serif',
      anchor: { x: 0.5, y: 0.5 },
    },
    onDown() {
      onNew()
    },
  })
  return {
    shutdown() {
      button.destroy()
    },
    update() {},
    render() {
      text.render()
      button.render()
    },
  }
}
