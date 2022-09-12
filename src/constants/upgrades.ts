export const UPGRADES = [
  {
    description: (n: number) => `Repair`,
    key: 'repair',
    label: 'Repair',
    cost: [],
  },
  {
    description: (n: number) => `Lay more mines at once`,
    key: 'mine_count',
    label: 'More mines',
    cost: [100, 200],
  },
  {
    description: (n: number) =>
      `Mines have larger explosions and do more damage`,
    key: 'mine_damage',
    label: 'Bigger mines',
    cost: [100],
  },
  {
    description: (n: number) => `Lay mines faster`,
    key: 'mine_speed',
    label: 'Faster mines',
    cost: [100],
  },
  {
    description: (n: number) => `Charge energy faster`,
    key: 'charge_speed',
    label: 'Faster charge',
    cost: [100],
  },
  {
    description: (n: number) => `Charge more energy before max`,
    key: 'charge_max',
    label: 'More charge',
    cost: [100],
  },
  {
    description: (n: number) => `Description`,
    key: 'bullet_count',
    label: 'More bullets',
    cost: [],
  },
  {
    description: (n: number) => `Shield`,
    key: 'shield',
    label: 'More shield',
    cost: [],
  },
]
