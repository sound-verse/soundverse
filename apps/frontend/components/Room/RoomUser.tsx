import classNames from 'classnames'
import { FC } from 'react'
import { User } from '../../common/graphql/schema.d'
import { ProfileImage, ProfileName } from '../profile'

type RoomUserProps = {
  className?: string
  user: User
}

export const RoomUser: FC<RoomUserProps> = ({ user, className }) => {
  return (
    <div className={className}>
      <div className="flex flex-col justify-center items-center w-16">
        <ProfileImage
          ethAddress={user.ethAddress}
          imageUrl={user.profileImage}
          height={15}
          width={15}
        />
        <div className="text-black mt-1">
          <ProfileName
            ethAddress={user.ethAddress}
            name={user.name}
            short={true}
            className="text-xs"
          />
        </div>
      </div>
    </div>
  )
}
