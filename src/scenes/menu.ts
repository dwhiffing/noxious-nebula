import { Button, Text } from 'kontra'

export const MenuScene = ({ canvas, onNew }) => {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  let text = Text({
    text: 'JS13k 2022',
    font: '80px sans-serif',
    color: '#555',
    x: width / 2,
    y: height / 2 - 180,
    anchor: { x: 0.5, y: 0.5 },
  })
  let text2 = Text({
    text: 'By Daniel Whiffing',
    font: '18px sans-serif',
    color: '#444',
    x: width / 2,
    y: height / 2 - 120,
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
      text2.render()
      button.render()
    },
  }
}
