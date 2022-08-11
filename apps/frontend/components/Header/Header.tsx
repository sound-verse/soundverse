import Link from 'next/link'
import { Toaster } from 'react-hot-toast'
import styles from './Header.module.css'
import Image from 'next/image'
import cn from 'classnames'
import { ConnectButton } from '../ConnectButton/ConnectButton'

const Header = ({ className = '' }) => {
  return (
    <div className={cn(styles.headerWrapper, className)}>
      <Toaster position="top-right" />
      <div className={styles.headerWrapperToo}>
        <div className={styles.logo}>
          <Link href="/soundverses" passHref>
            <a>
              <div className="relative w-20 lg:w-40 h-5 lg:h-12">
                <Image src="/logo-black.svg" alt="next" layout="fill" />
              </div>
            </a>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className={styles.linkWrapper}>
            <div className="flex items-center">
              <div className=" w-[20px] h-[20px] relative">
                <Image
                  className=""
                  src="/img/home.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/soundverses" passHref>
                <p className={styles.marketplaceLink}>Home</p>
              </Link>
            </div>

            <div className="flex items-center">
              <div className=" w-[30px]  h-[30px] relative">
                <Image
                  className=""
                  src="/img/dollar.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/marketplace" passHref>
                <p className={styles.marketplaceLink}>Market</p>
              </Link>
            </div>

            <div className="flex items-center">
              <div className=" w-[20px]  h-[20px] relative">
                <Image
                  className=""
                  src="/img/sparkling.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/mint" passHref>
                <p className={styles.marketplaceLink}>Mint</p>
              </Link>
            </div>

            <div className="flex items-center">
              <div className="w-[25px]  h-[25px] relative">
                <Image
                  className=""
                  src="/img/launch.svg"
                  alt="next"
                  layout="fill"
                />
              </div>
              <Link href="/launch" passHref>
                <p className={styles.marketplaceLink}>Launch</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.connectButtonWrapper}>
           <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
