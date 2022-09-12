export const LEVELS = [
  {
    waves: [
      // { type: 'homer', count: 1, rate: 2000 },
      { type: 'homer', count: 3, rate: 2000 },
      { type: 'homer', count: 3, rate: 1000, delay: 6000 },
      { type: 'homer', count: 6, rate: 500, delay: 9000 },
    ],
  },
  { waves: [{ type: 'homer', count: 30, rate: 800 }] },
  { waves: [{ type: 'defender', count: 8, rate: 1000 }] },
  {
    waves: [
      { type: 'defender', count: 8, rate: 0 },
      { type: 'homer', count: 8, rate: 1000, delay: 5000 },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 12, rate: 1000, circular: true },
      { type: 'homer', count: 8, rate: 1000, delay: 5000 },
    ],
  },
  { waves: [{ type: 'absorber', count: 8, delay: 10, rate: 1000 }] },
  {
    waves: [
      { type: 'defender', count: 8, delay: 10, rate: 1000 },
      { type: 'absorber', count: 8, delay: 10, rate: 1000 },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 8, delay: 10, rate: 1000 },
      { type: 'absorber', count: 8, delay: 10, rate: 1000 },
      { type: 'homer', count: 8, delay: 10, rate: 1000 },
    ],
  },
  { waves: [{ type: 'spike', count: 16, rate: 1000 }] },
]
