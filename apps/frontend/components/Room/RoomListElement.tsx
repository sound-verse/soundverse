import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
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
  const [anonArray, setAnonArry] = useState([])

  useEffect(() => {
    const newAnonArray = new Array(
      room?.currentAnonymousUsers > 0 ? room.currentAnonymousUsers : 0
    )
    newAnonArray.fill(0)
    setAnonArry(newAnonArray)
  }, [room?.currentAnonymousUsers])

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
                {room.name.length > 0
                  ? room.name
                  : `Soundverse #${room.id.substring(room.id.length - 4)}`}
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
                {room.activeUsers.length + anonArray.length}
              </div>
              <Image
                src={'/img/speaker.svg'}
                height={18}
                width={18}
                alt="Speaker symbol"
              />
            </div>
          </div>
          <div className="flex overflow-hidden mt-3 flex-col lg:flex-row">
            <div className="flex flex-col items-center lg:flex-row justify-between w-full md:w-auto">
              <div
                className={cn(
                  'flex flex-col items-baseline justify-start min-w-[60px] overflow-x-auto h-16 mb-5 lg:h-36 pt-2 mt-5 lg:mt-0',
                  styles.scrollbar
                )}
              >
                {room.activeUsers.map((user) => (
                  <div
                    className="flex items-center justify-center -mt-2"
                    key={user.id}
                  >
                    <ProfileImage
                      ethAddress={user.ethAddress}
                      imageUrl={user.profileImage}
                      height={10}
                      width={10}
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
                ))}
                {anonArray.map((value, key) => (
                  <div
                    className="flex -mt-2 justify-center items-center"
                    key={key}
                  >
                    <div className="relative rounded-full border-black border w-[30px] bg-black h-[30px] flex items-center justify-center">
                      <div className="text-white text-xl">?</div>
                    </div>
                    <div className="text-black mt-1 ml-1 text-xs">
                      Anon User
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-grow flex justify-center max-h-10 lg:max-h-full">
              <PlaylistPreview
                currentTrack={room.currentTrack}
                playlistItems={room.playlistItems}
                className=""
              />
            </div>

            <div className="mt-28 lg:mt-20 p-2 flex items-center justify-center lg:justify-end">
              <div
                className={
                  'bg-gradient-to-l from-[#1400FF] to-[#0089FF] text-sm rounded-md text-white px-2 py-2 shadow-lg cursor-pointer drop-shadow mb-2 p-2 lg:ml-auto lg:w-full'
                }
                onClick={handleEnterSoundverse}
              >
                Enter Soundverse
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
