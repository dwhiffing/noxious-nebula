export const LEVELS = [
  {
    waves: [
      { type: 'homer', count: 3, rate: 2000 },
      { type: 'homer', count: 3, rate: 1000, delay: 6000 },
      { type: 'homer', count: 6, rate: 500, delay: 9000 },
    ],
  },
  { waves: [{ type: 'homer', count: 30, rate: 800 }] },
  {
    waves: [
      { type: 'defender', count: 4, rate: 1000 },
      { type: 'homer', count: 8, rate: 1000, delay: 3000 },
    ],
  },
  { waves: [{ type: 'absorber', count: 4, rate: 0 }] },
  {
    waves: [
      { type: 'defender', count: 8, rate: 1000, delay: 2000, circular: true },
      { type: 'absorber', count: 8, rate: 0, circular: true },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 4, rate: 1000 },
      { type: 'homer', count: 15, rate: 1000, delay: 1000 },
      { type: 'absorber', count: 4, rate: 0 },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 8, rate: 1000, circular: true },
      { type: 'homer', count: 12, rate: 1000, delay: 5000 },
      { type: 'absorber', count: 8, rate: 0, circular: true },
    ],
  },
  { waves: [{ type: 'spike', count: 8, rate: 1000 }] },
  {
    waves: [
      { type: 'defender', count: 8, rate: 1000 },
      { type: 'homer', count: 12, rate: 1000, delay: 5000 },
      { type: 'absorber', count: 8, rate: 0 },
      { type: 'spike', count: 4, rate: 1000 },
    ],
  },
  {
    waves: [
      { type: 'defender', count: 12, rate: 1000 },
      { type: 'homer', count: 12, rate: 1000, delay: 5000 },
      { type: 'absorber', count: 12, rate: 0 },
      { type: 'spike', count: 8, rate: 1000 },
      { type: 'homer', count: 12, rate: 1000, delay: 10000 },
    ],
  },
]
