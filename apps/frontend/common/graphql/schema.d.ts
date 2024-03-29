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
  Timestamp: any
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
  followers?: Maybe<Array<User>>
  following?: Maybe<Array<User>>
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

export type CreateMintSellingInput = {
  mintVoucherInput: MintVoucherInput
  nftId: Scalars['String']
}

export type CreateRoomInput = {
  name: Scalars['String']
  playlistItems: Array<PlaylistItemInput>
}

export type CreateSellingInput = {
  nftId: Scalars['String']
  saleVoucherInput: SaleVoucherInput
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

export type MintVoucher = {
  __typename?: 'MintVoucher'
  creatorOwnerSplit: Scalars['Int']
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  maxSupply: Scalars['Int']
  price: Scalars['String']
  royaltyFeeLicense: Scalars['Int']
  royaltyFeeMaster: Scalars['Int']
  signature: Scalars['String']
  supply: Scalars['Int']
  tokenUri: Scalars['String']
  validUntil: Scalars['Float']
}

export type MintVoucherInput = {
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  price: Scalars['String']
  signature: Scalars['String']
  supply: Scalars['Int']
  validUntil: Scalars['Timestamp']
}

export type Mutation = {
  __typename?: 'Mutation'
  createChatMessage: Room
  createMintSelling: Selling
  createNft: Nft
  createRoom: Room
  createSelling: Selling
  follow: User
  generateVerificationToken: Scalars['Int']
  joinRoom: Room
  leaveRoom: Room
  login: Auth
  reviveRoom: Room
  unfollow: User
  updateUser: User
  uploadProfilePicture: User
}

export type MutationCreateChatMessageArgs = {
  createChatMessageInput: CreateChatMessageInput
}

export type MutationCreateMintSellingArgs = {
  createMintSellingInput: CreateMintSellingInput
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

export type MutationFollowArgs = {
  userId: Scalars['String']
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

export type MutationUnfollowArgs = {
  userId: Scalars['String']
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
  creatorOwnerSplit: Scalars['Float']
  filePictureUrl: Scalars['String']
  fileUrl: Scalars['String']
  id: Scalars['String']
  ipfsUrl: Scalars['String']
  licenseContractAddress: Scalars['String']
  licenseOwners?: Maybe<Array<NftOwner>>
  masterContractAddress: Scalars['String']
  masterOwner: NftOwner
  metadata: NftMetadata
  royaltyFeeLicense: Scalars['Float']
  royaltyFeeMaster: Scalars['Float']
  sellings?: Maybe<NftSelling>
  soundWave: Array<Scalars['Float']>
  supply: Scalars['Float']
  tokenId?: Maybe<Scalars['Float']>
  trackDuration: Scalars['Float']
  transactionHash?: Maybe<Scalars['String']>
}

export type NftFilter = {
  id?: InputMaybe<Scalars['String']>
  ipfsUrl?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['Float']>
}

export type NftInput = {
  chainId?: InputMaybe<Scalars['Float']>
  creatorOwnerSplit: Scalars['Int']
  genre: Scalars['String']
  metadata: NftMetadataInput
  royaltyFeeLicense: Scalars['Int']
  royaltyFeeMaster: Scalars['Int']
  soundWave: Array<Scalars['Float']>
  supply: Scalars['Float']
  tags: Array<Scalars['String']>
  trackBPM: Scalars['Float']
  trackDuration: Scalars['Float']
  transactionHash?: InputMaybe<Scalars['String']>
}

export type NftMetadata = {
  __typename?: 'NftMetadata'
  description: Scalars['String']
  name: Scalars['String']
}

export type NftMetadataInput = {
  description?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type NftOwner = {
  __typename?: 'NftOwner'
  supply: Scalars['Float']
  user: User
}

export type NftSearch = {
  __typename?: 'NftSearch'
  artists?: Maybe<Array<User>>
  nfts?: Maybe<Array<Nft>>
}

export type NftSearchInput = {
  search?: InputMaybe<Scalars['String']>
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
  sortOption?: InputMaybe<SortOption>
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
  search?: Maybe<NftSearch>
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

export type QuerySearchArgs = {
  searchInput: NftSearchInput
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
  currentAnonymousUsers?: Maybe<Scalars['Float']>
  currentTrack?: Maybe<PlaylistItem>
  id: Scalars['String']
  name: Scalars['String']
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

export type SaleVoucher = {
  __typename?: 'SaleVoucher'
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  nftContractAddress: Scalars['String']
  price: Scalars['String']
  signature: Scalars['String']
  supply: Scalars['Int']
  tokenUri: Scalars['String']
  validUntil: Scalars['Float']
}

export type SaleVoucherInput = {
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  nftContractAddress: Scalars['String']
  price: Scalars['String']
  signature: Scalars['String']
  supply: Scalars['Int']
  validUntil: Scalars['Timestamp']
}

export type Selling = {
  __typename?: 'Selling'
  buyers: Array<NftOwner>
  id: Scalars['String']
  marketplaceContractAddress: Scalars['String']
  mintVoucher?: Maybe<MintVoucher>
  nftType: Scalars['String']
  saleVoucher?: Maybe<SaleVoucher>
  seller: User
  sellingStatus: Scalars['String']
  transactionHash?: Maybe<Scalars['String']>
}

export enum SortOption {
  License = 'LICENSE',
  Master = 'MASTER',
  Name = 'NAME',
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
}

export type Subscription = {
  __typename?: 'Subscription'
  roomUpdated: Room
  roomsUpdated: Array<Room>
}

export type SubscriptionRoomUpdatedArgs = {
  roomId: Scalars['String']
  userId?: InputMaybe<Scalars['String']>
}

export type UpdateUserInput = {
  description?: InputMaybe<Scalars['String']>
  discord?: InputMaybe<Scalars['String']>
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
  followers?: Maybe<Array<User>>
  following?: Maybe<Array<User>>
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
  trackDuration: number
  soundWave: Array<number>
  filePictureUrl: string
  ipfsUrl: string
  transactionHash?: string | null
  supply: number
  chainId: number
  royaltyFeeMaster: number
  royaltyFeeLicense: number
  creatorOwnerSplit: number
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
      saleVoucher?: {
        __typename?: 'SaleVoucher'
        nftContractAddress: string
        price: string
        tokenUri: string
        isMaster: boolean
        signature: string
        supply: number
        currency: string
        validUntil: number
      } | null
      mintVoucher?: {
        __typename?: 'MintVoucher'
        price: string
        tokenUri: string
        isMaster: boolean
        signature: string
        supply: number
        maxSupply: number
        currency: string
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
        validUntil: number
      } | null
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
      saleVoucher?: {
        __typename?: 'SaleVoucher'
        nftContractAddress: string
        price: string
        tokenUri: string
        isMaster: boolean
        signature: string
        supply: number
        currency: string
        validUntil: number
      } | null
      mintVoucher?: {
        __typename?: 'MintVoucher'
        price: string
        tokenUri: string
        isMaster: boolean
        signature: string
        supply: number
        maxSupply: number
        currency: string
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
        validUntil: number
      } | null
    }> | null
  } | null
}

export type RoomFragmentFragment = {
  __typename?: 'Room'
  id: string
  name: string
  active: boolean
  currentAnonymousUsers?: number | null
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
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
  saleVoucher?: {
    __typename?: 'SaleVoucher'
    nftContractAddress: string
    price: string
    tokenUri: string
    isMaster: boolean
    signature: string
    supply: number
    currency: string
    validUntil: number
  } | null
  mintVoucher?: {
    __typename?: 'MintVoucher'
    price: string
    tokenUri: string
    isMaster: boolean
    signature: string
    supply: number
    maxSupply: number
    currency: string
    royaltyFeeMaster: number
    royaltyFeeLicense: number
    creatorOwnerSplit: number
    validUntil: number
  } | null
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
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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

export type CreateMintSellingMutationVariables = Exact<{
  createMintSellingInput: CreateMintSellingInput
}>

export type CreateMintSellingMutation = {
  __typename?: 'Mutation'
  createMintSelling: {
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
    saleVoucher?: {
      __typename?: 'SaleVoucher'
      nftContractAddress: string
      price: string
      tokenUri: string
      isMaster: boolean
      signature: string
      supply: number
      currency: string
      validUntil: number
    } | null
    mintVoucher?: {
      __typename?: 'MintVoucher'
      price: string
      tokenUri: string
      isMaster: boolean
      signature: string
      supply: number
      maxSupply: number
      currency: string
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
      validUntil: number
    } | null
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
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
    saleVoucher?: {
      __typename?: 'SaleVoucher'
      nftContractAddress: string
      price: string
      tokenUri: string
      isMaster: boolean
      signature: string
      supply: number
      currency: string
      validUntil: number
    } | null
    mintVoucher?: {
      __typename?: 'MintVoucher'
      price: string
      tokenUri: string
      isMaster: boolean
      signature: string
      supply: number
      maxSupply: number
      currency: string
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
      validUntil: number
    } | null
  }
}

export type FollowMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type FollowMutation = {
  __typename?: 'Mutation'
  follow: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
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
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type UnfollowMutation = {
  __typename?: 'Mutation'
  unfollow: {
    __typename?: 'User'
    id: string
    name?: string | null
    description?: string | null
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
    trackDuration: number
    soundWave: Array<number>
    filePictureUrl: string
    ipfsUrl: string
    transactionHash?: string | null
    supply: number
    chainId: number
    royaltyFeeMaster: number
    royaltyFeeLicense: number
    creatorOwnerSplit: number
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
        saleVoucher?: {
          __typename?: 'SaleVoucher'
          nftContractAddress: string
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          currency: string
          validUntil: number
        } | null
        mintVoucher?: {
          __typename?: 'MintVoucher'
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeMaster: number
          royaltyFeeLicense: number
          creatorOwnerSplit: number
          validUntil: number
        } | null
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
        saleVoucher?: {
          __typename?: 'SaleVoucher'
          nftContractAddress: string
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          currency: string
          validUntil: number
        } | null
        mintVoucher?: {
          __typename?: 'MintVoucher'
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeMaster: number
          royaltyFeeLicense: number
          creatorOwnerSplit: number
          validUntil: number
        } | null
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
    trackDuration: number
    soundWave: Array<number>
    filePictureUrl: string
    ipfsUrl: string
    transactionHash?: string | null
    supply: number
    chainId: number
    royaltyFeeMaster: number
    royaltyFeeLicense: number
    creatorOwnerSplit: number
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
        saleVoucher?: {
          __typename?: 'SaleVoucher'
          nftContractAddress: string
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          currency: string
          validUntil: number
        } | null
        mintVoucher?: {
          __typename?: 'MintVoucher'
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeMaster: number
          royaltyFeeLicense: number
          creatorOwnerSplit: number
          validUntil: number
        } | null
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
        saleVoucher?: {
          __typename?: 'SaleVoucher'
          nftContractAddress: string
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          currency: string
          validUntil: number
        } | null
        mintVoucher?: {
          __typename?: 'MintVoucher'
          price: string
          tokenUri: string
          isMaster: boolean
          signature: string
          supply: number
          maxSupply: number
          currency: string
          royaltyFeeMaster: number
          royaltyFeeLicense: number
          creatorOwnerSplit: number
          validUntil: number
        } | null
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
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
      name: string
      active: boolean
      currentAnonymousUsers?: number | null
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
          trackDuration: number
          soundWave: Array<number>
          filePictureUrl: string
          ipfsUrl: string
          transactionHash?: string | null
          supply: number
          chainId: number
          royaltyFeeMaster: number
          royaltyFeeLicense: number
          creatorOwnerSplit: number
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
              saleVoucher?: {
                __typename?: 'SaleVoucher'
                nftContractAddress: string
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                currency: string
                validUntil: number
              } | null
              mintVoucher?: {
                __typename?: 'MintVoucher'
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeMaster: number
                royaltyFeeLicense: number
                creatorOwnerSplit: number
                validUntil: number
              } | null
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
              saleVoucher?: {
                __typename?: 'SaleVoucher'
                nftContractAddress: string
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                currency: string
                validUntil: number
              } | null
              mintVoucher?: {
                __typename?: 'MintVoucher'
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeMaster: number
                royaltyFeeLicense: number
                creatorOwnerSplit: number
                validUntil: number
              } | null
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
          trackDuration: number
          soundWave: Array<number>
          filePictureUrl: string
          ipfsUrl: string
          transactionHash?: string | null
          supply: number
          chainId: number
          royaltyFeeMaster: number
          royaltyFeeLicense: number
          creatorOwnerSplit: number
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
              saleVoucher?: {
                __typename?: 'SaleVoucher'
                nftContractAddress: string
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                currency: string
                validUntil: number
              } | null
              mintVoucher?: {
                __typename?: 'MintVoucher'
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeMaster: number
                royaltyFeeLicense: number
                creatorOwnerSplit: number
                validUntil: number
              } | null
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
              saleVoucher?: {
                __typename?: 'SaleVoucher'
                nftContractAddress: string
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                currency: string
                validUntil: number
              } | null
              mintVoucher?: {
                __typename?: 'MintVoucher'
                price: string
                tokenUri: string
                isMaster: boolean
                signature: string
                supply: number
                maxSupply: number
                currency: string
                royaltyFeeMaster: number
                royaltyFeeLicense: number
                creatorOwnerSplit: number
                validUntil: number
              } | null
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
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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

export type SearchQueryVariables = Exact<{
  searchInput: NftSearchInput
}>

export type SearchQuery = {
  __typename?: 'Query'
  search?: {
    __typename?: 'NftSearch'
    nfts?: Array<{
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      masterContractAddress: string
      licenseContractAddress: string
      fileUrl: string
      trackDuration: number
      soundWave: Array<number>
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      royaltyFeeMaster: number
      royaltyFeeLicense: number
      creatorOwnerSplit: number
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
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
          saleVoucher?: {
            __typename?: 'SaleVoucher'
            nftContractAddress: string
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            currency: string
            validUntil: number
          } | null
          mintVoucher?: {
            __typename?: 'MintVoucher'
            price: string
            tokenUri: string
            isMaster: boolean
            signature: string
            supply: number
            maxSupply: number
            currency: string
            royaltyFeeMaster: number
            royaltyFeeLicense: number
            creatorOwnerSplit: number
            validUntil: number
          } | null
        }> | null
      } | null
    }> | null
    artists?: Array<{
      __typename?: 'User'
      id: string
      name?: string | null
      description?: string | null
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
  } | null
}

export type RoomUpdatedSubscriptionVariables = Exact<{
  roomId: Scalars['String']
  userId?: InputMaybe<Scalars['String']>
}>

export type RoomUpdatedSubscription = {
  __typename?: 'Subscription'
  roomUpdated: {
    __typename?: 'Room'
    id: string
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
    name: string
    active: boolean
    currentAnonymousUsers?: number | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
        trackDuration: number
        soundWave: Array<number>
        filePictureUrl: string
        ipfsUrl: string
        transactionHash?: string | null
        supply: number
        chainId: number
        royaltyFeeMaster: number
        royaltyFeeLicense: number
        creatorOwnerSplit: number
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
            saleVoucher?: {
              __typename?: 'SaleVoucher'
              nftContractAddress: string
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              currency: string
              validUntil: number
            } | null
            mintVoucher?: {
              __typename?: 'MintVoucher'
              price: string
              tokenUri: string
              isMaster: boolean
              signature: string
              supply: number
              maxSupply: number
              currency: string
              royaltyFeeMaster: number
              royaltyFeeLicense: number
              creatorOwnerSplit: number
              validUntil: number
            } | null
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
