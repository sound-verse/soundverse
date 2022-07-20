import { FC } from 'react'
import { PlaylistItem } from '../../common/graphql/schema'
import SoundCard from '../marketplace/SoundCard'

type PlaylistPreviewProps = {
  className?: string
  playlistItems: PlaylistItem[]
  currentTrack: PlaylistItem
}

export const PlaylistPreview: FC<PlaylistPreviewProps> = ({
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

  const previousTrackIndex =
    currentTrackIndex === 0 ? playlistItems.length - 1 : currentTrackIndex - 1

  const nextTrackIndex =
    currentTrackIndex === playlistItems.length - 1 ? 0 : currentTrackIndex + 1

  return (
    <div className={className}>
      <div className="relative w-[220px] h-[100px]">
        <div className="relative">
          <SoundCard
            nft={playlistItems[previousTrackIndex].nft}
            nftType={playlistItems[previousTrackIndex].nftType}
            className="scale-[40%] absolute -top-20 -right-20"
            showAudioBar={false}
          />
          <div className="bg-gradient-to-l from-white via-white absolute w-20 h-32 top-1 -right-5 z-10"></div>
        </div>
        <div className="relative">
          <SoundCard
            nft={currentTrack.nft}
            nftType={currentTrack.nftType}
            className="scale-[40%] absolute -top-20 left-2"
            showAudioBar={false}
          />
        </div>
        <div className="relative">
          <SoundCard
            nft={playlistItems[nextTrackIndex].nft}
            nftType={playlistItems[nextTrackIndex].nftType}
            className="scale-[40%] absolute -top-20 -left-20"
            showAudioBar={false}
          />
          <div className="bg-gradient-to-r from-white via-white absolute w-20 h-32 top-1 -left-5 z-10"></div>
        </div>
      </div>
    </div>
  )
}
