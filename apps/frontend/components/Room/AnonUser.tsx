import classNames from 'classnames'
import { FC } from 'react'
import { User } from '../../common/graphql/schema.d'
import Image from 'next/image'

type AnonUserProps = {
  className?: string
}

export const AnonUser: FC<AnonUserProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex flex-col justify-center items-center w-[80px]">
        <div className="relative rounded-full border-black border w-[45px] bg-black h-[45px] flex items-center justify-center">
          <div className='text-white text-2xl'>?</div>
        </div>
        <div className="text-black mt-1 text-xs">Anon User</div>
      </div>
    </div>
  )
}
