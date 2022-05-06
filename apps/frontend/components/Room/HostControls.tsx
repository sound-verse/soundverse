import { FC } from 'react'
import { Room } from '../../common/graphql/schema'
import { useHostControls } from '../../hooks/rooms/useHostControls'

type HostControlProps = {
  className?: string
  room: Room
}

export const HostControls: FC<HostControlProps> = ({ className, room }) => {
  const { playNextSong, playPrevSong } = useHostControls()

  const handlePrevSong = async () => {
    await playPrevSong()
  }
  const handleNextSong = async () => {
    await playNextSong()
  }
  return (
    <div className={className}>
      <div className="flex text-white">
        <div
          className="mr-2 cursor-pointer hover:text-purple"
          onClick={handlePrevSong}
        >
          {'<'} Prev song
        </div>
        <div
          className="cursor-pointer hover:text-purple"
          onClick={handleNextSong}
        >
          Next song {'>'}
        </div>
      </div>
    </div>
  )
}
