import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { AuthUser, Selling } from '../../common/graphql/schema.d'
import { ProfileName } from '../profile'
import Link from 'next/link'
import Web3 from 'web3'

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

  return (
    <div className=" bg-grey-dark flex flex-col rounded-2xl w-full pt-5">
      <div className="rounded-b-2xl mb-5 bg-grey-medium">
        <div className="grid bg-grey-dark grid-cols-7 pb-2 w-full px-5">
          <div className="col-span-1">{sellings.length} Availbable</div>
          <div className="col-start-3"></div>
          <div className="col-start-6"></div>
        </div>
        <div className="grid bg-grey-dark grid-cols-10 pb-5 w-full px-5">
          <div className="col-span-1"></div>
          <div className="col-start-3">Price</div>
          <div className="col-start-6">Owner</div>
          <div className="col-start-9">#Listed</div>
        </div>
        {sellings.map((selling, key) => (
          <div
            key={key}
            className="grid bg-grey-medium grid-cols-10 py-3 border-b border-black px-5 items-baseline cursor-pointer"
            onClick={() => {
              setSelectedLicense(selling.id), setSelectedSelling(selling)
            }}
          >
            <div className="col-span-1">
              <div
                className={`rounded-full border border-white w-4 h-4 mt-1 hover:bg-white ${
                  selectedLicense === selling.id ? 'bg-white' : 'bg-none'
                }`}
              />
            </div>
            <div className="font-bold text-sm col-start-3">
              {parseFloat(
                Web3.utils.fromWei(
                  selling.saleVoucher?.price ?? selling.mintVoucher?.price
                )
              ).toFixed(2)}
              <span className="ml-2">
                {selling.saleVoucher?.currency ?? selling.mintVoucher?.currency}
              </span>
            </div>
            <div className="text-purple col-start-6">
              <Link href={`/profile/${selling.seller.ethAddress}`}>
                <a>
                  <ProfileName
                    name={selling.seller.name}
                    ethAddress={selling.seller.ethAddress}
                    short={true}
                  />
                </a>
              </Link>
            </div>
            <div className="col-start-9 text-center">
              {selling.mintVoucher?.supply ?? selling.saleVoucher.supply}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
