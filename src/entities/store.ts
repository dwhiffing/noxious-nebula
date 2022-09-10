import { Text, Sprite, track } from 'kontra'
import { playSound } from '../utils'
import { UPGRADES } from '../constants'

// TODO: refactor
export const Store = ({ canvas, onPurchase, onNext, getPlayer }) => {
  let active = false
  const background = Sprite({
    x: canvas.width / 2 - 250,
    y: 50,
    width: 500,
    height: 400,
    color: '#555',
  })
  let buttons = []
  let selected = null

  const moneyText = Text({
    x: canvas.width - 200,
    y: 90,
    text: '',
    color: 'rgba(255,255,255,1)',
    font: '32px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
  })
  buttons.push(moneyText)

  const costText = Text({
    x: 200,
    y: 90,
    text: '',
    color: 'rgba(255,255,255,0)',
    font: '32px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
  })
  buttons.push(costText)

  const descriptionText = Text({
    x: canvas.width / 2,
    y: 120,
    text: 'a description',
    color: 'rgba(255,255,255,0)',
    font: '16px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
  })
  buttons.push(descriptionText)

  const purchase = Text({
    x: canvas.width / 2,
    y: 420,
    text: 'Purchase',
    color: 'rgba(255,255,255,0)',
    font: '32px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
    onDown() {
      this.color = 'rgba(255,255,255,0'
      playSound('click')
      buttons.forEach((b) => {
        if (b.isLabel) b.color = 'white'
      })
      if (typeof selected?.upgrade.key === 'string') {
        onPurchase(selected.upgrade)
        const upgrades = getPlayer().upgrades
        selected.count.text = upgrades[selected.upgrade.key]

        let player = getPlayer()
        player.sprite.money -= Number(costText.text.replace('$', ''))
        moneyText.text = `$${player.sprite.money}`

        if (
          !UPGRADES.find((u) => u.key === selected.upgrade.key).cost[
            upgrades[selected.upgrade.key]
          ]
        ) {
          selected.count.color = 'rgba(255,255,255,0.5)'
          selected.label.color = 'rgba(255,255,255,0.5)'
          costText.text = ''
          descriptionText.text = ''
        }
      }
      selected = null
    },
  })
  track(purchase)
  buttons.push(purchase)

  const start = Text({
    x: canvas.width / 2 + 200,
    y: 420,
    text: 'Next',
    color: 'white',
    font: '32px sans-serif',
    anchor: { x: 0.5, y: 0.5 },
    onDown() {
      active = false
      canvas.requestPointerLock()
      playSound('nextLevel')

      onNext()
    },
  })
  track(start)
  buttons.push(start)

  const upgrades = getPlayer().upgrades

  UPGRADES.forEach((upgrade, i) => {
    const x = canvas.width / 2 - 200 + 100 * (i % 5)
    const y = i >= 5 ? 350 : 250
    const onDown = () => {
      const upgrades = getPlayer().upgrades
      const key = upgrade.key
      if (!upgrade.cost[upgrades[key]]) return
      playSound('click')
      buttons.forEach((b) => {
        if (b.isLabel && b.color === 'red') b.color = 'white'
      })
      purchase.color = 'white'
      selected = { upgrade, count, label }
      label.color = 'red'
      costText.text = `$${upgrade.cost[upgrades[key]]}`
      costText.color = `rgba(255,255,255,1)`
      descriptionText.text = `${upgrade.description(upgrades[key])}`
      descriptionText.color = 'rgba(255,255,255,1)'
    }
    const alpha = UPGRADES.find((u) => u.key === upgrade.key)?.cost[
      upgrades[upgrade.key]
    ]
      ? 1
      : 0.5
    const count = Text({
      x,
      y: y - 30,
      text: upgrades[upgrade.key]?.toString(),
      color: `rgba(255,255,255,${alpha})`,
      font: '24px sans-serif',
      anchor: { x: 0.5, y: 0.5 },
      onDown,
    })
    buttons.push(count)
    const label = Text({
      x,
      y,
      text: upgrade.label,
      color: `rgba(255,255,255,${alpha})`,
      font: '14px sans-serif',
      anchor: { x: 0.5, y: 0.5 },
      onDown,
      isLabel: true,
    })
    track(label)
    buttons.push(label)
  })

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
      moneyText.text = `$${getPlayer().sprite.money}`
    },
    render() {
      if (!active) return
      background.render()
      buttons.forEach((b) => b.render())
    },
  }
}
