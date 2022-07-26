import { useRouter } from 'next/router'
import { FC } from 'react'
import { Room } from '../../common/graphql/schema'
import { useJoinRoom } from '../../hooks/rooms/useJoinRoom'
import Button from '../common/Button'
import SoundCard from '../marketplace/SoundCard'
import { ProfileImage, ProfileName } from '../profile'
import styles from './RoomListElement.module.css'
import Image from 'next/image'
import { PlaylistPreview } from './PlaylistPreview'
import cn from 'classnames'

type RoomListElementProps = {
  room: Room
}

export const RoomListElement: FC<RoomListElementProps> = ({ room }) => {
  const { joinRoom } = useJoinRoom()
  const router = useRouter()

  const handleEnterSoundverse = async () => {
    router.push({
      pathname: `/soundverses/${room.id}`,
    })
  }
  return (
    <div className={styles.roomWrapper}>
      <div className="h-full w-full">
        <div className="flex flex-col px-10 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-bold text-lg text-black">
                Soundverse #{room.id.substring(room.id.length - 4)}
              </div>
              {/* <div className="flex text-sm">
                <div className="mx-2">hosted by</div>
                <div className="flex items-center">
                  <ProfileImage
                    ethAddress={room.creator.ethAddress}
                    imageUrl={room.creator.profileImage}
                    height={6}
                    width={6}
                    className="mr-1"
                  />
                  <ProfileName
                    ethAddress={room.creator.ethAddress}
                    name={room.creator.name}
                    short={true}
                  />
                </div>
              </div> */}
            </div>
            <div className="flex items-center">
              <div className="mx-2 text-xs text-grey-light">
                {room.activeUsers.length}
              </div>
              <Image
                src={'/img/speaker.svg'}
                height={20}
                width={20}
                alt="Speaker symbol"
              />
            </div>
          </div>
          <div className="flex overflow-hidden mt-3 flex-wrap">
            <div className='flex justify-between w-full md:w-auto'>
              <div
                className={cn(
                  'flex flex-col items-baseline justify-start w-[110px] overflow-x-auto h-36 pt-2',
                  styles.scrollbar
                )}
              >
                {room.activeUsers.map((user) => (
                  <>
                    <div
                      className="flex items-center justify-center -mt-2"
                      key={user.id}
                    >
                      <ProfileImage
                        ethAddress={user.ethAddress}
                        imageUrl={user.profileImage}
                        height={10}
                        width={10}
                        className={!user.profileImage ? '' : ''}
                      />
                      <div className="text-black mt-1 ml-1">
                        <ProfileName
                          ethAddress={user.ethAddress}
                          name={user.name}
                          short={true}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="ml-10">
                <PlaylistPreview
                  currentTrack={room.currentTrack}
                  playlistItems={room.playlistItems}
                />
              </div>
            </div>
            <div className="md:mt-20 ml-auto w-full md:w-auto">
              <div className="flex flex-col h-full w-[180px] ">
                <Button
                  text={'Enter the Soundverse'}
                  type={'normal'}
                  className={styles.enterButton}
                  onClick={handleEnterSoundverse}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
