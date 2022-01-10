import React from 'react'
import styles from './SoundCard.module.scss'
import Image from 'next/image'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Rarity } from '../../model/data/testData'

function SoundCard(props) {
  const {
    pic,
    name,
    rarity,
    title,
    album,
    lowest_ask,
    avg_sale,
    num_listings,
  } = props.data
  const logMe = () => {
    console.log(rarity)
  }
  return (
    <div className={styles.soundcardWrapper}>
      <div className={styles.cardExterior}>
        <div className={styles.addButton}>
          <IoIosAddCircleOutline
            onClick={logMe}
            color="white"
            opacity={'80%'}
          />
        </div>
        <div className={styles.addButtonBg}></div>
        {/* <div className={styles.test}></div> */}
        <div
          className={
            rarity === 0
              ? styles.cardInteriorLeftWhite
              : styles.cardInteriorLeftPurple
          }
        >
          {' '}
          <p className={styles.poundText}>#/1500</p>
        </div>
        <div
          className={
            rarity === 0
              ? styles.cardInteriorBaseWhite
              : styles.cardInteriorBasePurple
          }
        >
          <p className={styles.nameText}>{name}</p>
          <p className={styles.listingText}>{num_listings} listings</p>
          <p className={styles.lowestAskText}>
            Price: <b>{lowest_ask} </b>
          </p>
        </div>
        <div className={styles.mplaceImage}>
          <Image
            src={pic}
            layout="fixed"
            width={270}
            height={270}
            quality={100}
          />
        </div>

        {/* <p className={styles.titleText}>{title}</p>
        <p className={styles.albumText}>{album}</p>

        <p className={styles.avgSaleText}>{avg_sale}</p> */}
      </div>
    </div>
  )
}

export default SoundCard
