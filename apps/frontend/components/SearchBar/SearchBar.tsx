import React, { FC, useEffect } from 'react'
import cn from 'classnames'
import styles from './SearchBar.module.css'
import debounce from 'lodash.debounce'
import { useLazyQuery } from '@apollo/client'
import { NFT_SEARCH } from '../../common/graphql/queries/nft-search.query'
import {
  NftType,
  SearchQuery,
  SearchQueryVariables,
} from '../../common/graphql/schema.d'
import Image from 'next/image'
import Link from 'next/link'
import SoundCard from '../marketplace/SoundCard'
import { ProfileImage, ProfileName } from '../profile'
import useComponentVisible from '../../hooks/useComponentVisible'

interface SearchBarProps {
  className?: string
}

export const SearchBar: FC<SearchBarProps> = ({ className }) => {
  const [search, setSearch] = React.useState('')
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true)

  const [
    searchQuery,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery<SearchQuery, SearchQueryVariables>(NFT_SEARCH)

  const nftsResult = searchData?.search?.nfts ?? []
  const artistsResult = searchData?.search?.artists ?? []

  const debouncedSearch = debounce((search) => {
    searchQuery({ variables: { searchInput: { search } } })
  }, 500)

  useEffect(() => {
    debouncedSearch(search)
    setIsComponentVisible(true)
    return () => {
      debouncedSearch.cancel()
    }
  }, [search])

  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.searchInputIcon}>
          <Image src={'/img/searchIcon.svg'} layout="fill" alt="search" />
        </div>
        <input
          className={styles.searchInput}
          type={'text'}
          placeholder="Search by Nft or Artist name"
          onChange={(event) => setSearch(event.target.value.toString())}
        />
      </div>
      {nftsResult.length === 0 && artistsResult.length === 0 && search.length > 2 && (
        <div className={styles.searchResultWrapper}>No search results</div>
      )}
      {(nftsResult.length > 0 || artistsResult.length > 0) && (
        <div ref={ref}>
          {isComponentVisible && (
            <div className={styles.searchResultWrapper}>
              {nftsResult.length > 0 && (
                <div className={styles.nftsResultWrapper}>
                  <div className={styles.resultHeading}>Nfts</div>
                  {nftsResult?.map((nft) => (
                    <div className={styles.nftResultWrapper} key={nft.id}>
                      <Link href={`/license/${nft.id}`}>
                        <a>
                          <div className={styles.nftResult}>
                            <div className={styles.nftResultCard}>
                              <SoundCard nft={nft} nftType={NftType.License} />
                            </div>
                            <div className={styles.nftResultText}>
                              <div>{nft.metadata.name}</div>
                              <div>
                                <ProfileName
                                  ethAddress={nft.creator.ethAddress}
                                  name={nft.creator.name}
                                  fullName={true}
                                  short={true}
                                />
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {artistsResult.length > 0 && nftsResult.length > 0 && (
                <div className={styles.resultPadding}></div>
              )}
              {artistsResult.length > 0 && (
                <div className={styles.artistsResultWrapper}>
                  <div className={styles.resultHeading}>Artists</div>
                  {artistsResult?.map((artist) => (
                    <div className={styles.artistResultWrapper} key={artist.id}>
                      <Link href={`/profile/${artist.ethAddress}`}>
                        <a>
                          <div className={styles.artistResult}>
                            <div className={styles.artistResultImage}>
                              <ProfileImage
                                ethAddress={artist.ethAddress}
                                height={10}
                                width={10}
                                imageUrl={artist.profileImage}
                              />
                            </div>
                            <div className={styles.artistResultText}>
                              <ProfileName
                                ethAddress={artist.ethAddress}
                                name={artist.name}
                                fullName={true}
                                short={true}
                              />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
