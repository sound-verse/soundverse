import { FC } from 'react'
import { PlaylistItem } from '../../common/graphql/schema'

type PlaylistProps = {
  playlistItems: PlaylistItem[]
  currentTrack: PlaylistItem
}

export const Playlist: FC<PlaylistProps> = ({
  playlistItems,
  currentTrack,
}) => {
  return <div></div>
}
