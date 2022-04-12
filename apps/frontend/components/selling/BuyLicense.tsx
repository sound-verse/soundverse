import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { LoggedInUser, useLogin } from '../../hooks/useLogin'
import { Selling } from '../../common/graphql/schema'
import { ProfileName } from '../profile'
import Link from 'next/link'
import Web3 from 'web3'

export type BuyLicenseProps = {
  user: LoggedInUser
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
    <div className=" bg-grey-dark flex flex-col rounded-2xl w-full pt-10">
      <div className="pb-12 rounded-b-2xl bg-grey-medium">
        <div className="grid bg-grey-dark grid-cols-7 pb-5 w-full px-10">
          <div className="col-span-1">{sellings.length} Availbable</div>
          <div className="col-start-3"></div>
          <div className="col-start-6"></div>
        </div>
        <div className="grid bg-grey-dark grid-cols-7 pb-5 w-full px-10">
          <div className="col-span-1"></div>
          <div className="col-start-3">Price</div>
          <div className="col-start-6">Owner</div>
        </div>
        {sellings.map((selling, key) => (
          <div
            key={key}
            className="grid bg-grey-medium grid-cols-7 py-5 border-b border-black px-10 "
          >
            <div className="col-span-1">
              <div
                onClick={() => {
                  setSelectedLicense(selling.id), setSelectedSelling(selling)
                }}
                className={`rounded-full border border-white w-6 h-6 hover:bg-white cursor-pointer ${
                  selectedLicense === selling.id ? 'bg-white' : 'bg-none'
                }`}
              />
            </div>
            <div className="font-bold col-start-3">
              {parseFloat(
                Web3.utils.fromWei(selling.sellingVoucher.price)
              ).toFixed(2)}
              <span className="ml-2">{selling.sellingVoucher.currency}</span>
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
          </div>
        ))}
      </div>
    </div>
  )
}
