export const listDroppers = [
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=8B7BCDC2',
    name: 'Tiesto',
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB',
    name: 'Tiesto',
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=A89D0DE6',
    name: 'Tiesto',
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=9D9539E7',
    name: 'Tiesto',
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=4F32C4CF',
    name: 'Tiesto',
  },
]
export enum Rarity {
  White = 0,
  Purple = 1,
}
export type DropItem = {
  pic: string
  name: string
  title: string
  album: string
  lowest_ask: string
  avg_sale: string
  num_listings: number
  rarity: Rarity
}

export const latestDrops: DropItem[] = [
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=8B7BCDC2',
    name: 'Tiesto',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: 0,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB',
    name: 'Tiesto',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.White,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=A89D0DE6',
    name: 'Tiesto',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.Purple,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=9D9539E7',
    name: 'Tiesto',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.White,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=4F32C4CF',
    name: 'Tiesto',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.Purple,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=8B7BCDC2',
    name: 'Tiesto',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.White,
  },
]
