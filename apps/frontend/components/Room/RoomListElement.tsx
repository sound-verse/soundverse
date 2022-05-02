import { FC } from 'react'
import { Room } from '../../common/graphql/schema'
import Button from '../common/Button'
import SoundCard from '../marketplace/SoundCard'
import { ProfileImage, ProfileName } from '../profile'

type RoomListElementProps = {
  room: Room
}

export const RoomListElement: FC<RoomListElementProps> = ({ room }) => {
  return (
    <div className="rounded-3xl bg-grey-dark my-5 mx-auto h-[270px] w-full">
      <div className="grid grid-cols-12 h-full w-full">
        <div className="col-span-2">
          <SoundCard
            nft={room.currentTrack?.nft ?? room.playlistItems[0].nft}
            nftType={
              room.currentTrack?.nftType ?? room.playlistItems[0].nftType
            }
            className="scale-[70%] -mt-10 -ml-6 -mb-20"
          ></SoundCard>
        </div>
        <div className="col-span-6">
          <div className="flex flex-col mt-10">
            <div className="flex">
              <div className="font-bold text-sm text-white">
                Soundverse #{room.id.substring(room.id.length - 4)}
              </div>
              <div className="flex text-sm text-grey-light ml-2">
                <div className="mr-2">hosted by</div>
                <ProfileName
                  ethAddress={room.creator.ethAddress}
                  name={room.creator.name}
                  short={true}
                />
              </div>
            </div>
            <div className="flex">
              {room.activeUsers.map((user) => (
                <ProfileImage
                  ethAddress={user.ethAddress}
                  imageUrl={user.profileImage}
                  height={20}
                  width={20}
                  key={user.id}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col h-full">
            <Button
              text="Enter the Soundverse"
              type="purple"
              className="mt-auto mb-5 mr-5"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
