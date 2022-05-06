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
      <div className="flex flex-col justify-center items-center">
        <ProfileImage
          ethAddress={user.ethAddress}
          imageUrl={user.profileImage}
          height={18}
          width={18}
        />
        <div className="text-grey-light mt-1">
          <ProfileName
            ethAddress={user.ethAddress}
            name={user.name}
            short={true}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  )
}
