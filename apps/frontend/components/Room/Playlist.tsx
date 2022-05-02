import { FC } from 'react'
import { PlaylistItem } from '../../common/graphql/schema'
import SoundCard from '../marketplace/SoundCard'

type PlaylistProps = {
  className?: string
  playlistItems: PlaylistItem[]
  currentTrack: PlaylistItem
}

export const Playlist: FC<PlaylistProps> = ({
  playlistItems,
  currentTrack,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex flex-col">
        {currentTrack && (
          <>
            <div className="text-white font-bold text-2xl">Now playing</div>
            <SoundCard
              nft={currentTrack.nft}
              nftType={currentTrack.nftType}
              className="mb-1 scale-75"
            />
          </>
        )}
        <div className="text-white font-bold text-2xl text-center mt-5 mb-5">
          Coming next
        </div>
        {playlistItems.map((item) => (
          <SoundCard
            nft={item.nft}
            nftType={item.nftType}
            className="-mb-10 scale-75"
          />
        ))}
      </div>
    </div>
  )
}
