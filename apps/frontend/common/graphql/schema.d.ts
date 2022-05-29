export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Auth = {
  __typename?: 'Auth'
  /** JWT Bearer token */
  token: Scalars['String']
  user?: Maybe<AuthUser>
}

export type AuthUser = {
  __typename?: 'AuthUser'
  description?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  ethAddress?: Maybe<Scalars['String']>
  id: Scalars['String']
  instagram?: Maybe<Scalars['String']>
  joinedRoomId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
  soundcloud?: Maybe<Scalars['String']>
  spotify?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
  website?: Maybe<Scalars['String']>
}

export type ChatMessage = {
  __typename?: 'ChatMessage'
  message: Scalars['String']
  sender: User
}

export type CreateChatMessageInput = {
  message: Scalars['String']
  roomId: Scalars['String']
}

export type CreateRoomInput = {
  playlistItems: Array<PlaylistItemInput>
}

export type CreateSellingInput = {
  nftId: Scalars['String']
  sellingVoucher: SellingVoucherInput
}

export type JoinRoomInput = {
  roomId: Scalars['String']
}

export type LeaveRoomInput = {
  roomId: Scalars['String']
}

export type LoginInput = {
  ethAddress: Scalars['String']
  signature: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createChatMessage: Room
  createNft: Nft
  createRoom: Room
  createSelling: Selling
  generateVerificationToken: Scalars['Int']
  joinRoom: Room
  leaveRoom: Room
  login: Auth
  nextSong: Room
  prevSong: Room
  reviveRoom: Room
  unpinAll: Scalars['Boolean']
  updateCurrentSong: Room
  updateUser: User
  uploadProfilePicture: User
}

export type MutationCreateChatMessageArgs = {
  createChatMessageInput: CreateChatMessageInput
}

export type MutationCreateNftArgs = {
  NFTFile: Scalars['Upload']
  data: NftInput
  pictureFile: Scalars['Upload']
}

export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput
}

export type MutationCreateSellingArgs = {
  createSellingInput: CreateSellingInput
}

export type MutationGenerateVerificationTokenArgs = {
  data: VerificationTokenInput
}

export type MutationJoinRoomArgs = {
  joinRoomInput: JoinRoomInput
}

export type MutationLeaveRoomArgs = {
  leaveRoomInput: LeaveRoomInput
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationUpdateCurrentSongArgs = {
  updateCurrentSongInput: UpdateCurrentSongInput
}

export type MutationUpdateUserArgs = {
  data: UpdateUserInput
}

export type MutationUploadProfilePictureArgs = {
  file: Scalars['Upload']
}

export type Nft = {
  __typename?: 'Nft'
  chainId: Scalars['Int']
  creator?: Maybe<User>
  filePictureUrl: Scalars['String']
  fileUrl: Scalars['String']
  id: Scalars['String']
  ipfsUrl: Scalars['String']
  licenseContractAddress: Scalars['String']
  licenseOwners?: Maybe<Array<NftOwner>>
  masterContractAddress: Scalars['String']
  masterOwner: NftOwner
  metadata: NftMetadata
  royaltyFeeInBips: Scalars['Float']
  sellings?: Maybe<NftSelling>
  supply: Scalars['Float']
  tokenId?: Maybe<Scalars['Float']>
  transactionHash?: Maybe<Scalars['String']>
}

export type NftFilter = {
  id?: InputMaybe<Scalars['String']>
  ipfsUrl?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['Float']>
}

export type NftInput = {
  chainId?: InputMaybe<Scalars['Float']>
  metadata: NftMetadataInput
  royaltyFeeInBips: Scalars['Int']
  supply: Scalars['Float']
  tags: Array<Scalars['String']>
  transactionHash?: InputMaybe<Scalars['String']>
}

export type NftMetadata = {
  __typename?: 'NftMetadata'
  description: Scalars['String']
  name: Scalars['String']
}

export type NftMetadataInput = {
  description: Scalars['String']
  name: Scalars['String']
}

export type NftOwner = {
  __typename?: 'NftOwner'
  supply: Scalars['Float']
  user: User
}

export type NftSelling = {
  __typename?: 'NftSelling'
  licenseSellings?: Maybe<Array<Selling>>
  masterSelling?: Maybe<Selling>
}

export enum NftType {
  License = 'LICENSE',
  Master = 'MASTER',
}

export type NftsFilter = {
  hasSelling?: InputMaybe<Scalars['Boolean']>
}

export type PlaylistItem = {
  __typename?: 'PlaylistItem'
  currentPosition?: Maybe<Scalars['Float']>
  nft?: Maybe<Nft>
  nftType?: Maybe<NftType>
}

export type PlaylistItemInput = {
  nftId: Scalars['String']
  nftType: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  me: User
  nft?: Maybe<Nft>
  nfts?: Maybe<Array<Nft>>
  room: Room
  rooms: Rooms
  user?: Maybe<User>
  userNfts: UserNfts
}

export type QueryNftArgs = {
  filter: NftFilter
}

export type QueryNftsArgs = {
  filter?: InputMaybe<NftsFilter>
  limit: Scalars['Int']
  skip: Scalars['Int']
}

export type QueryRoomArgs = {
  roomFilter: RoomFilter
}

export type QueryUserArgs = {
  ethAddress: Scalars['String']
}

export type QueryUserNftsArgs = {
  ethAddress?: InputMaybe<Scalars['String']>
}

export type Room = {
  __typename?: 'Room'
  active: Scalars['Boolean']
  activeUsers?: Maybe<Array<User>>
  chat?: Maybe<Array<ChatMessage>>
  creator?: Maybe<User>
  currentTrack?: Maybe<PlaylistItem>
  id: Scalars['String']
  playlistItems?: Maybe<Array<PlaylistItem>>
}

export type RoomFilter = {
  creatorId?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  isMasterRoom?: InputMaybe<Scalars['Boolean']>
}

export type Rooms = {
  __typename?: 'Rooms'
  rooms?: Maybe<Array<Room>>
}

export type Selling = {
  __typename?: 'Selling'
  buyers: Array<NftOwner>
  id: Scalars['String']
  marketplaceContractAddress: Scalars['String']
  nftType: Scalars['String']
  seller: User
  sellingStatus: Scalars['String']
  sellingVoucher: SellingVoucher
  transactionHash?: Maybe<Scalars['String']>
}

export type SellingVoucher = {
  __typename?: 'SellingVoucher'
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  maxSupply: Scalars['Int']
  nftContractAddress: Scalars['String']
  price: Scalars['String']
  royaltyFeeInBips: Scalars['Float']
  sellCount: Scalars['Int']
  signature: Scalars['String']
  supply: Scalars['Int']
  tokenId: Scalars['Int']
  tokenUri: Scalars['String']
}

export type SellingVoucherInput = {
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  maxSupply: Scalars['Int']
  nftContractAddress: Scalars['String']
  price: Scalars['String']
  royaltyFeeInBips: Scalars['Int']
  sellCount: Scalars['Int']
  signature: Scalars['String']
  supply: Scalars['Int']
  tokenId: Scalars['Int']
  tokenUri: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  roomUpdated: Room
  roomsUpdated: Array<Room>
}

export type SubscriptionRoomUpdatedArgs = {
  roomId: Scalars['String']
}

export type UpdateCurrentSongInput = {
  currentPosition: Scalars['Float']
}

export type UpdateUserInput = {
  description?: InputMaybe<Scalars['String']>
  discord?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  instagram?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  soundcloud?: InputMaybe<Scalars['String']>
  spotify?: InputMaybe<Scalars['String']>
  twitter?: InputMaybe<Scalars['String']>
  website?: InputMaybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  description?: Maybe<Scalars['String']>
  discord?: Maybe<Scalars['String']>
  ethAddress?: Maybe<Scalars['String']>
  id: Scalars['String']
  instagram?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
  soundcloud?: Maybe<Scalars['String']>
  spotify?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
  website?: Maybe<Scalars['String']>
}

export type UserNfts = {
  __typename?: 'UserNfts'
  createdLicenseNfts?: Maybe<Array<Nft>>
  createdMasterNfts?: Maybe<Array<Nft>>
  ownedLicenseNfts?: Maybe<Array<Nft>>
  ownedMasterNfts?: Maybe<Array<Nft>>
}

export type VerificationTokenInput = {
  ethAddress: Scalars['String']
}

export type NftOwnerFragmentFragment = {
  __typename?: 'NftOwner'
  supply: number
  user: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    ethAddress?: string | null
    twitter?: string | null
    instagram?: string | null
    soundcloud?: string | null
    discord?: string | null
    spotify?: string | null
    website?: string | null
    profileImage?: string | null
    verified?: boolean | null
  }
}

export type NftFragmentFragment = {
  __typename?: 'Nft'
  id: string
  tokenId?: number | null
  masterContractAddress: string
  licenseContractAddress: string
  fileUrl: string
  filePictureUrl: string
  ipfsUrl: string
  transactionHash?: string | null
  supply: number
  chainId: number
  royaltyFeeInBips: number
  masterOwner: {
    __typename?: 'NftOwner'
    supply: number
    user: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }
  }
  metadata: { __typename?: 'NftMetadata'; name: string; description: string }
  creator?: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    ethAddress?: string | null
    twitter?: string | null
    instagram?: string | null
    soundcloud?: string | null
    discord?: string | null
    spotify?: string | null
    website?: string | null
    profileImage?: string | null
    verified?: boolean | null
  } | null
  licenseOwners?: Array<{
    __typename?: 'NftOwner'
    supply: number
    user: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }
  }> | null
  sellings?: {
    __typename?: 'NftSelling'
    masterSelling?: {
      __typename?: 'Selling'
      id: string
      nftType: string
      marketplaceContractAddress: string
      sellingStatus: string
      transactionHash?: string | null
      seller: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
      buyers: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }>
      sellingVoucher: {
        __typename?: 'SellingVoucher'
        nftContractAddress: string
        price: string
        tokenId: number
        tokenUri: string
        isMaster: boolean
        signature: string
        sellCount: number
        supply: number
        maxSupply: number
        currency: string
        royaltyFeeInBips: number
      }
    } | null
    licenseSellings?: Array<{
      __typename?: 'Selling'
      id: string
      nftType: string
      marketplaceContractAddress: string
      sellingStatus: string
      transactionHash?: string | null
      seller: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
      buyers: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }>
      sellingVoucher: {
        __typename?: 'SellingVoucher'
        nftContractAddress: string
        price: string
        tokenId: number
        tokenUri: string
        isMaster: boolean
        signature: string
        sellCount: number
        supply: number
        maxSupply: number
        currency: string
        royaltyFeeInBips: number
      }
    }> | null
  } | null
}

export type RoomFragmentFragment = {
  __typename?: 'Room'
  id: string
  active: boolean
  creator?: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    ethAddress?: string | null
    twitter?: string | null
    instagram?: string | null
    soundcloud?: string | null
    discord?: string | null
    spotify?: string | null
    website?: string | null
    profileImage?: string | null
    verified?: boolean | null
  } | null
  playlistItems?: Array<{
    __typename?: 'PlaylistItem'
    currentPosition?: number | null
    nftType?: NftType | null
    nft?: {
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeInBips: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }
      metadata: {
        __typename?: 'NftMetadata'
        name: string
        description: string
      }
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
      sellings?: {
        __typename?: 'NftSelling'
        masterSelling?: {
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        } | null
        licenseSellings?: Array<{
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        }> | null
      } | null
    } | null
  }> | null
  currentTrack?: {
    __typename?: 'PlaylistItem'
    currentPosition?: number | null
    nftType?: NftType | null
    nft?: {
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeInBips: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }
      metadata: {
        __typename?: 'NftMetadata'
        name: string
        description: string
      }
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
      sellings?: {
        __typename?: 'NftSelling'
        masterSelling?: {
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        } | null
        licenseSellings?: Array<{
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        }> | null
      } | null
    } | null
  } | null
  activeUsers?: Array<{
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    ethAddress?: string | null
    twitter?: string | null
    instagram?: string | null
    soundcloud?: string | null
    discord?: string | null
    spotify?: string | null
    website?: string | null
    profileImage?: string | null
    verified?: boolean | null
  }> | null
  chat?: Array<{
    __typename?: 'ChatMessage'
    message: string
    sender: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }
  }> | null
}

export type SellingFragmentFragment = {
  __typename?: 'Selling'
  id: string
  nftType: string
  marketplaceContractAddress: string
  sellingStatus: string
  transactionHash?: string | null
  seller: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    ethAddress?: string | null
    twitter?: string | null
    instagram?: string | null
    soundcloud?: string | null
    discord?: string | null
    spotify?: string | null
    website?: string | null
    profileImage?: string | null
    verified?: boolean | null
  }
  buyers: Array<{
    __typename?: 'NftOwner'
    supply: number
    user: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }
  }>
  sellingVoucher: {
    __typename?: 'SellingVoucher'
    nftContractAddress: string
    price: string
    tokenId: number
    tokenUri: string
    isMaster: boolean
    signature: string
    sellCount: number
    supply: number
    maxSupply: number
    currency: string
    royaltyFeeInBips: number
  }
}

export type UserFragmentFragment = {
  __typename?: 'User'
  id: string
  name?: string | null
  description?: string | null
  ethAddress?: string | null
  twitter?: string | null
  instagram?: string | null
  soundcloud?: string | null
  discord?: string | null
  spotify?: string | null
  website?: string | null
  profileImage?: string | null
  verified?: boolean | null
}

export type CreateChatMessageMutationVariables = Exact<{
  createChatMessageInput: CreateChatMessageInput
}>

export type CreateChatMessageMutation = {
  __typename?: 'Mutation'
  createChatMessage: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type CreateRoomMutationVariables = Exact<{
  createRoomInput: CreateRoomInput
}>

export type CreateRoomMutation = {
  __typename?: 'Mutation'
  createRoom: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type CreateSellingMutationVariables = Exact<{
  createSellingInput: CreateSellingInput
}>

export type CreateSellingMutation = {
  __typename?: 'Mutation'
  createSelling: {
    __typename?: 'Selling'
    id: string
    nftType: string
    marketplaceContractAddress: string
    sellingStatus: string
    transactionHash?: string | null
    seller: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }
    buyers: Array<{
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }>
    sellingVoucher: {
      __typename?: 'SellingVoucher'
      nftContractAddress: string
      price: string
      tokenId: number
      tokenUri: string
      isMaster: boolean
      signature: string
      sellCount: number
      supply: number
      maxSupply: number
      currency: string
      royaltyFeeInBips: number
    }
  }
}

export type GenerateVerificationTokenMutationVariables = Exact<{
  data: VerificationTokenInput
}>

export type GenerateVerificationTokenMutation = {
  __typename?: 'Mutation'
  generateVerificationToken: number
}

export type JoinRoomMutationVariables = Exact<{
  joinRoomInput: JoinRoomInput
}>

export type JoinRoomMutation = {
  __typename?: 'Mutation'
  joinRoom: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type LeaveRoomMutationVariables = Exact<{
  leaveRoomInput: LeaveRoomInput
}>

export type LeaveRoomMutation = {
  __typename?: 'Mutation'
  leaveRoom: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type LoginMutationVariables = Exact<{
  data: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'Auth'; token: string }
}

export type NextSongMutationVariables = Exact<{ [key: string]: never }>

export type NextSongMutation = {
  __typename?: 'Mutation'
  nextSong: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type PrevSongMutationVariables = Exact<{ [key: string]: never }>

export type PrevSongMutation = {
  __typename?: 'Mutation'
  prevSong: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type ReviveRoomMutationVariables = Exact<{ [key: string]: never }>

export type ReviveRoomMutation = {
  __typename?: 'Mutation'
  reviveRoom: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type UpdateCurrentSongMutationVariables = Exact<{
  updateCurrentSongInput: UpdateCurrentSongInput
}>

export type UpdateCurrentSongMutation = {
  __typename?: 'Mutation'
  updateCurrentSong: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type GetNftQueryVariables = Exact<{
  filter: NftFilter
}>

export type GetNftQuery = {
  __typename?: 'Query'
  nft?: {
    __typename?: 'Nft'
    id: string
    tokenId?: number | null
    masterContractAddress: string
    licenseContractAddress: string
    fileUrl: string
    filePictureUrl: string
    ipfsUrl: string
    transactionHash?: string | null
    supply: number
    chainId: number
    royaltyFeeInBips: number
    masterOwner: {
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }
    metadata: { __typename?: 'NftMetadata'; name: string; description: string }
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    licenseOwners?: Array<{
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
    sellings?: {
      __typename?: 'NftSelling'
      masterSelling?: {
        __typename?: 'Selling'
        id: string
        nftType: string
        marketplaceContractAddress: string
        sellingStatus: string
        transactionHash?: string | null
        seller: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
        buyers: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }>
        sellingVoucher: {
          __typename?: 'SellingVoucher'
          nftContractAddress: string
          price: string
          tokenId: number
          tokenUri: string
          isMaster: boolean
          signature: string
          sellCount: number
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeInBips: number
        }
      } | null
      licenseSellings?: Array<{
        __typename?: 'Selling'
        id: string
        nftType: string
        marketplaceContractAddress: string
        sellingStatus: string
        transactionHash?: string | null
        seller: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
        buyers: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }>
        sellingVoucher: {
          __typename?: 'SellingVoucher'
          nftContractAddress: string
          price: string
          tokenId: number
          tokenUri: string
          isMaster: boolean
          signature: string
          sellCount: number
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeInBips: number
        }
      }> | null
    } | null
  } | null
}

export type GetNftsQueryVariables = Exact<{
  filter?: InputMaybe<NftsFilter>
  limit: Scalars['Int']
  skip: Scalars['Int']
}>

export type GetNftsQuery = {
  __typename?: 'Query'
  nfts?: Array<{
    __typename?: 'Nft'
    id: string
    tokenId?: number | null
    masterContractAddress: string
    licenseContractAddress: string
    fileUrl: string
    filePictureUrl: string
    ipfsUrl: string
    transactionHash?: string | null
    supply: number
    chainId: number
    royaltyFeeInBips: number
    masterOwner: {
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }
    metadata: { __typename?: 'NftMetadata'; name: string; description: string }
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    licenseOwners?: Array<{
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
    sellings?: {
      __typename?: 'NftSelling'
      masterSelling?: {
        __typename?: 'Selling'
        id: string
        nftType: string
        marketplaceContractAddress: string
        sellingStatus: string
        transactionHash?: string | null
        seller: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
        buyers: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }>
        sellingVoucher: {
          __typename?: 'SellingVoucher'
          nftContractAddress: string
          price: string
          tokenId: number
          tokenUri: string
          isMaster: boolean
          signature: string
          sellCount: number
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeInBips: number
        }
      } | null
      licenseSellings?: Array<{
        __typename?: 'Selling'
        id: string
        nftType: string
        marketplaceContractAddress: string
        sellingStatus: string
        transactionHash?: string | null
        seller: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
        buyers: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }>
        sellingVoucher: {
          __typename?: 'SellingVoucher'
          nftContractAddress: string
          price: string
          tokenId: number
          tokenUri: string
          isMaster: boolean
          signature: string
          sellCount: number
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeInBips: number
        }
      }> | null
    } | null
  }> | null
}

export type GetRoomQueryVariables = Exact<{
  roomFilter: RoomFilter
}>

export type GetRoomQuery = {
  __typename?: 'Query'
  room: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type GetRoomsQueryVariables = Exact<{ [key: string]: never }>

export type GetRoomsQuery = {
  __typename?: 'Query'
  rooms: {
    __typename?: 'Rooms'
    rooms?: Array<{
      __typename?: 'Room'
      id: string
      active: boolean
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      playlistItems?: Array<{
        __typename?: 'PlaylistItem'
        currentPosition?: number | null
        nftType?: NftType | null
        nft?: {
          __typename?: 'Nft'
          id: string
          tokenId?: number | null
          masterContractAddress: string
          licenseContractAddress: string
          fileUrl: string
          filePictureUrl: string
          ipfsUrl: string
          transactionHash?: string | null
          supply: number
          chainId: number
          royaltyFeeInBips: number
          masterOwner: {
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }
          metadata: {
            __typename?: 'NftMetadata'
            name: string
            description: string
          }
          creator?: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          } | null
          licenseOwners?: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }> | null
          sellings?: {
            __typename?: 'NftSelling'
            masterSelling?: {
              __typename?: 'Selling'
              id: string
              nftType: string
              marketplaceContractAddress: string
              sellingStatus: string
              transactionHash?: string | null
              seller: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
              buyers: Array<{
                __typename?: 'NftOwner'
                supply: number
                user: {
                  __typename?: 'User'
                  id: string
                  name?: string | null
                  description?: string | null
                  ethAddress?: string | null
                  twitter?: string | null
                  instagram?: string | null
                  soundcloud?: string | null
                  discord?: string | null
                  spotify?: string | null
                  website?: string | null
                  profileImage?: string | null
                  verified?: boolean | null
                }
              }>
              sellingVoucher: {
                __typename?: 'SellingVoucher'
                nftContractAddress: string
                price: string
                tokenId: number
                tokenUri: string
                isMaster: boolean
                signature: string
                sellCount: number
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeInBips: number
              }
            } | null
            licenseSellings?: Array<{
              __typename?: 'Selling'
              id: string
              nftType: string
              marketplaceContractAddress: string
              sellingStatus: string
              transactionHash?: string | null
              seller: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
              buyers: Array<{
                __typename?: 'NftOwner'
                supply: number
                user: {
                  __typename?: 'User'
                  id: string
                  name?: string | null
                  description?: string | null
                  ethAddress?: string | null
                  twitter?: string | null
                  instagram?: string | null
                  soundcloud?: string | null
                  discord?: string | null
                  spotify?: string | null
                  website?: string | null
                  profileImage?: string | null
                  verified?: boolean | null
                }
              }>
              sellingVoucher: {
                __typename?: 'SellingVoucher'
                nftContractAddress: string
                price: string
                tokenId: number
                tokenUri: string
                isMaster: boolean
                signature: string
                sellCount: number
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeInBips: number
              }
            }> | null
          } | null
        } | null
      }> | null
      currentTrack?: {
        __typename?: 'PlaylistItem'
        currentPosition?: number | null
        nftType?: NftType | null
        nft?: {
          __typename?: 'Nft'
          id: string
          tokenId?: number | null
          masterContractAddress: string
          licenseContractAddress: string
          fileUrl: string
          filePictureUrl: string
          ipfsUrl: string
          transactionHash?: string | null
          supply: number
          chainId: number
          royaltyFeeInBips: number
          masterOwner: {
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }
          metadata: {
            __typename?: 'NftMetadata'
            name: string
            description: string
          }
          creator?: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          } | null
          licenseOwners?: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }> | null
          sellings?: {
            __typename?: 'NftSelling'
            masterSelling?: {
              __typename?: 'Selling'
              id: string
              nftType: string
              marketplaceContractAddress: string
              sellingStatus: string
              transactionHash?: string | null
              seller: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
              buyers: Array<{
                __typename?: 'NftOwner'
                supply: number
                user: {
                  __typename?: 'User'
                  id: string
                  name?: string | null
                  description?: string | null
                  ethAddress?: string | null
                  twitter?: string | null
                  instagram?: string | null
                  soundcloud?: string | null
                  discord?: string | null
                  spotify?: string | null
                  website?: string | null
                  profileImage?: string | null
                  verified?: boolean | null
                }
              }>
              sellingVoucher: {
                __typename?: 'SellingVoucher'
                nftContractAddress: string
                price: string
                tokenId: number
                tokenUri: string
                isMaster: boolean
                signature: string
                sellCount: number
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeInBips: number
              }
            } | null
            licenseSellings?: Array<{
              __typename?: 'Selling'
              id: string
              nftType: string
              marketplaceContractAddress: string
              sellingStatus: string
              transactionHash?: string | null
              seller: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
              buyers: Array<{
                __typename?: 'NftOwner'
                supply: number
                user: {
                  __typename?: 'User'
                  id: string
                  name?: string | null
                  description?: string | null
                  ethAddress?: string | null
                  twitter?: string | null
                  instagram?: string | null
                  soundcloud?: string | null
                  discord?: string | null
                  spotify?: string | null
                  website?: string | null
                  profileImage?: string | null
                  verified?: boolean | null
                }
              }>
              sellingVoucher: {
                __typename?: 'SellingVoucher'
                nftContractAddress: string
                price: string
                tokenId: number
                tokenUri: string
                isMaster: boolean
                signature: string
                sellCount: number
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeInBips: number
              }
            }> | null
          } | null
        } | null
      } | null
      activeUsers?: Array<{
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }> | null
      chat?: Array<{
        __typename?: 'ChatMessage'
        message: string
        sender: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
    }> | null
  }
}

export type GetUserNftsQueryVariables = Exact<{
  ethAddress?: InputMaybe<Scalars['String']>
}>

export type GetUserNftsQuery = {
  __typename?: 'Query'
  userNfts: {
    __typename?: 'UserNfts'
    createdMasterNfts?: Array<{
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeInBips: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }
      metadata: {
        __typename?: 'NftMetadata'
        name: string
        description: string
      }
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
      sellings?: {
        __typename?: 'NftSelling'
        masterSelling?: {
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        } | null
        licenseSellings?: Array<{
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        }> | null
      } | null
    }> | null
    createdLicenseNfts?: Array<{
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeInBips: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }
      metadata: {
        __typename?: 'NftMetadata'
        name: string
        description: string
      }
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
      sellings?: {
        __typename?: 'NftSelling'
        masterSelling?: {
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        } | null
        licenseSellings?: Array<{
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        }> | null
      } | null
    }> | null
    ownedMasterNfts?: Array<{
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeInBips: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }
      metadata: {
        __typename?: 'NftMetadata'
        name: string
        description: string
      }
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
      sellings?: {
        __typename?: 'NftSelling'
        masterSelling?: {
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        } | null
        licenseSellings?: Array<{
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        }> | null
      } | null
    }> | null
    ownedLicenseNfts?: Array<{
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeInBips: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }
      metadata: {
        __typename?: 'NftMetadata'
        name: string
        description: string
      }
      creator?: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        }
      }> | null
      sellings?: {
        __typename?: 'NftSelling'
        masterSelling?: {
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        } | null
        licenseSellings?: Array<{
          __typename?: 'Selling'
          id: string
          nftType: string
          marketplaceContractAddress: string
          sellingStatus: string
          transactionHash?: string | null
          seller: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
          buyers: Array<{
            __typename?: 'NftOwner'
            supply: number
            user: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
          }>
          sellingVoucher: {
            __typename?: 'SellingVoucher'
            nftContractAddress: string
            price: string
            tokenId: number
            tokenUri: string
            isMaster: boolean
            signature: string
            sellCount: number
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeInBips: number
          }
        }> | null
      } | null
    }> | null
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
    ethAddress?: string | null
    twitter?: string | null
    instagram?: string | null
    soundcloud?: string | null
    discord?: string | null
    spotify?: string | null
    website?: string | null
    profileImage?: string | null
    verified?: boolean | null
  }
}

export type RoomUpdatedSubscriptionVariables = Exact<{
  roomId: Scalars['String']
}>

export type RoomUpdatedSubscription = {
  __typename?: 'Subscription'
  roomUpdated: {
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }
}

export type RoomsUpdatedSubscriptionVariables = Exact<{ [key: string]: never }>

export type RoomsUpdatedSubscription = {
  __typename?: 'Subscription'
  roomsUpdated: Array<{
    __typename?: 'Room'
    id: string
    active: boolean
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    } | null
    playlistItems?: Array<{
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    }> | null
    currentTrack?: {
      __typename?: 'PlaylistItem'
      currentPosition?: number | null
      nftType?: NftType | null
      nft?: {
        __typename?: 'Nft'
        id: string
        tokenId?: number | null
        masterContractAddress: string
        licenseContractAddress: string
        fileUrl: string
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeInBips: number
        masterOwner: {
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }
        metadata: {
          __typename?: 'NftMetadata'
          name: string
          description: string
        }
        creator?: {
          __typename?: 'User'
          id: string
          name?: string | null
          description?: string | null
          ethAddress?: string | null
          twitter?: string | null
          instagram?: string | null
          soundcloud?: string | null
          discord?: string | null
          spotify?: string | null
          website?: string | null
          profileImage?: string | null
          verified?: boolean | null
        } | null
        licenseOwners?: Array<{
          __typename?: 'NftOwner'
          supply: number
          user: {
            __typename?: 'User'
            id: string
            name?: string | null
            description?: string | null
            ethAddress?: string | null
            twitter?: string | null
            instagram?: string | null
            soundcloud?: string | null
            discord?: string | null
            spotify?: string | null
            website?: string | null
            profileImage?: string | null
            verified?: boolean | null
          }
        }> | null
        sellings?: {
          __typename?: 'NftSelling'
          masterSelling?: {
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          } | null
          licenseSellings?: Array<{
            __typename?: 'Selling'
            id: string
            nftType: string
            marketplaceContractAddress: string
            sellingStatus: string
            transactionHash?: string | null
            seller: {
              __typename?: 'User'
              id: string
              name?: string | null
              description?: string | null
              ethAddress?: string | null
              twitter?: string | null
              instagram?: string | null
              soundcloud?: string | null
              discord?: string | null
              spotify?: string | null
              website?: string | null
              profileImage?: string | null
              verified?: boolean | null
            }
            buyers: Array<{
              __typename?: 'NftOwner'
              supply: number
              user: {
                __typename?: 'User'
                id: string
                name?: string | null
                description?: string | null
                ethAddress?: string | null
                twitter?: string | null
                instagram?: string | null
                soundcloud?: string | null
                discord?: string | null
                spotify?: string | null
                website?: string | null
                profileImage?: string | null
                verified?: boolean | null
              }
            }>
            sellingVoucher: {
              __typename?: 'SellingVoucher'
              nftContractAddress: string
              price: string
              tokenId: number
              tokenUri: string
              isMaster: boolean
              signature: string
              sellCount: number
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeInBips: number
            }
          }> | null
        } | null
      } | null
    } | null
    activeUsers?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
      ethAddress?: string | null
      twitter?: string | null
      instagram?: string | null
      soundcloud?: string | null
      discord?: string | null
      spotify?: string | null
      website?: string | null
      profileImage?: string | null
      verified?: boolean | null
    }> | null
    chat?: Array<{
      __typename?: 'ChatMessage'
      message: string
      sender: {
        __typename?: 'User'
        id: string
        name?: string | null
        description?: string | null
        ethAddress?: string | null
        twitter?: string | null
        instagram?: string | null
        soundcloud?: string | null
        discord?: string | null
        spotify?: string | null
        website?: string | null
        profileImage?: string | null
        verified?: boolean | null
      }
    }> | null
  }>
}
