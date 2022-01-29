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
  WHITE = 0,
  PURPLE = 1,
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
    name: 'Daft Punk',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: 0,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=500B67FB',
    name: 'Adele',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.WHITE,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=A89D0DE6',
    name: 'Lana Del Rey',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.PURPLE,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=9D9539E7',
    name: 'Metallica',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.WHITE,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=4F32C4CF',
    name: 'Katy Perry',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.PURPLE,
  },
  {
    pic: 'https://api.lorem.space/image/album?w=150&h=150&hash=8B7BCDC2',
    name: 'Daft Punk',
    title: 'Solomun Drop - Jun 11 2021, 2021 - Dubai',
    album: 'Common#/100 LE',
    lowest_ask: '$6,021.00',
    avg_sale: '$5,128,50',
    num_listings: 267,
    rarity: Rarity.WHITE,
  },
]
