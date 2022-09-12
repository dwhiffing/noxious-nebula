import { Text, track } from 'kontra'

export const MenuScene = ({
  canvas,
  heading,
  description,
  texts,
  button1,
  button2,
}: any) => {
  const width = canvas.width
  const height = canvas.height
  let i = 0
  let text = Text({
    text: heading,
    textAlign: 'center',
    font: '80px sans-serif',
    color: '#eee',
    x: width / 2,
    y: height / 2 - 200,
  })
  let text2 = Text({
    text: description || texts[0],
    font: '18px sans-serif',
    textAlign: 'center',
    lineHeight: 1.5,
    color: '#999',
    x: width / 2,
    y: height / 2 - 80,
  })
  let button = Text({
    x: width / 2,
    y: height / 2 + 200,
    text: texts ? 'Next' : 'Start',
    color: '#aaa',
    font: '40px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
    onDown: () => {
      if (texts && i < texts.length) {
        text2.text = texts[i++]
        if (i === texts.length) button.text = 'Start'
      } else {
        button1()
      }
    },
  })
  track(button)
  let helpButton
  if (button2) {
    helpButton = Text({
      x: width / 2,
      y: height / 2 + 150,
      text: 'Help',
      color: '#aaa',
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
