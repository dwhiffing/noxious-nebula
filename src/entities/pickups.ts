import { Pool } from 'kontra'
import { Circle } from './bullets'

export const Pickups = () => {
  return Pool({
    // @ts-ignore
    create: (...args) => new Circle(...args),
  })
}
