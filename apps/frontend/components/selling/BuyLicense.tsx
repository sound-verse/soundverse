import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { AuthUser, Selling } from '../../common/graphql/schema.d'
import { ProfileName } from '../profile'
import Link from 'next/link'
import Web3 from 'web3'
import cn from 'classnames'
import styles from './BuyLicense.module.css'

export type BuyLicenseProps = {
  user: AuthUser
  sellings: Selling[]
  showSingleNftPage: Dispatch<SetStateAction<boolean>>
  setSelectedSelling: Dispatch<SetStateAction<Selling>>
}

export const BuyLicense = ({
  user,
  sellings,
  showSingleNftPage,
  setSelectedSelling,
}: BuyLicenseProps) => {
  const [selectedLicense, setSelectedLicense] = useState<string>(undefined)

  const getSellingSupplyLeft = (selling: Selling) => {
    const alreadyBoughtSupply = selling.buyers.reduce(
      (amount, buyer) => amount + buyer.supply,
      0
    )

    return (
      (selling.saleVoucher?.supply ?? selling.mintVoucher.supply) -
      alreadyBoughtSupply
    )
  }

  return (
    <div
      className={cn(
        ' bg-white flex flex-col rounded-2xl w-full pt-5 text-center',
        styles.boxShadow
      )}
    >
      <div className="rounded-b-2xl mb-5 bg-grey-medium">
        <div className="grid bg-white grid-cols-7 pb-2 w-full px-5">
          <div className="col-span-1">{sellings.length} Availbable</div>
          <div className="col-start-3"></div>
          <div className="col-start-6"></div>
        </div>
        <div className="grid bg-white grid-cols-10 pb-5 w-full px-5">
          <div className="col-span-1"></div>
          <div className="col-span-3">Price</div>
          <div className="col-span-4">Owner</div>
          <div className="col-span-2">#Listed</div>
        </div>
        {sellings.map((selling, key) => (
          <div
            key={key}
            className="grid bg-white grid-cols-10 py-3 border-b border-black px-5 items-baseline cursor-pointer last:border-none even:bg-grey-light"
            onClick={() => {
              setSelectedLicense(selling.id), setSelectedSelling(selling)
            }}
          >
            <div className="col-span-1">
              <div
                className={`rounded-full border border-black w-4 h-4 mt-1 hover:bg-black ${
                  selectedLicense === selling.id ? 'bg-black' : 'bg-none'
                }`}
              />
            </div>
            <div className="font-bold text-sm col-span-3">
              {parseFloat(
                Web3.utils.fromWei(
                  selling.saleVoucher?.price ?? selling.mintVoucher?.price
                )
              ).toFixed(2)}
              <span className="ml-2">
                {selling.saleVoucher?.currency ?? selling.mintVoucher?.currency}
              </span>
            </div>
            <div className="text-purple col-span-4">
              <Link href={`/profile/${selling.seller.ethAddress}`}>
                <a>
                  <ProfileName
                    name={selling.seller.name}
                    ethAddress={selling.seller.ethAddress}
                    short={true}
                    fullName={true}
                  />
                </a>
              </Link>
            </div>
            <div className="col-span-2">{getSellingSupplyLeft(selling)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
