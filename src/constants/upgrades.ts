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
    cost: [50, 100],
  },
  {
    description: (n: number) => `Lay mines faster`,
    key: 'mine_speed',
    label: 'Faster mines',
    cost: [50, 100],
  },
  {
    description: (n: number) =>
      `Mines have larger explosions and do more damage`,
    key: 'mine_damage',
    label: 'Bigger mines',
    cost: [200],
  },
  {
    description: (n: number) => `Charge energy faster`,
    key: 'charge_speed',
    label: 'Faster charge',
    cost: [250, 500],
  },
  {
    description: (n: number) =>
      `Charge more energy before max, allowing more damage`,
    key: 'charge_max',
    label: 'More charge',
    cost: [300, 600],
  },
  {
    description: (n: number) => `Provides shield which recharges over time.`,
    key: 'shield',
    label: 'Shield',
    cost: [500],
  },
  {
    description: (n: number) => `Fire one extra bullet when you fire a blast`,
    key: 'bullet_count',
    label: 'Extra Blast',
    cost: [600, 1200],
  },
]
