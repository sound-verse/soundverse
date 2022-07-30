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
  const currentTrackIndex = playlistItems.findIndex((item) => {
    return (
      item.nft.id === currentTrack.nft.id &&
      item.nftType === currentTrack.nftType
    )
  })

  const firstPartPlaylist = playlistItems.slice(0, currentTrackIndex)
  const lastPartPlaylist = playlistItems.slice(currentTrackIndex + 1)

  const reorderedPlaylistItems = [...lastPartPlaylist, ...firstPartPlaylist]

  return (
    <div className={className}>
      <div className="flex flex-col">
        {currentTrack.nft && (
          <>
            <div className="text-black font-semibold text-lg text-center">
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
        <div className="text-black font-semibold text-lg text-center">
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
