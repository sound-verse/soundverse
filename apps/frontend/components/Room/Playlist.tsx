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
  const reorderedPlaylistItems = playlistItems.filter(
    (item) =>
      item.nft.id !== currentTrack.nft.id ||
      item.nftType !== currentTrack.nftType
  )
  reorderedPlaylistItems.push(currentTrack)

  return (
    <div className={className}>
      <div className="flex flex-col">
        {currentTrack.nft && (
          <>
            <div className="text-white font-semibold text-2xl text-center">
              Now playing
            </div>
            <SoundCard
              nft={currentTrack.nft}
              nftType={currentTrack.nftType}
              className="mb-1 scale-75"
              showAudioBar={false}
            />
          </>
        )}
        <div className="text-white font-semibold text-2xl text-center mt-5 mb-5">
          Coming next
        </div>
        {reorderedPlaylistItems.map((item, key) => (
          <SoundCard
            key={key}
            nft={item.nft}
            nftType={item.nftType}
            className="-mb-10 scale-75"
            showAudioBar={false}
          />
        ))}
      </div>
    </div>
  )
}
