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
  name?: Maybe<Scalars['String']>
  profileImage?: Maybe<Scalars['String']>
  soundcloud?: Maybe<Scalars['String']>
  spotify?: Maybe<Scalars['String']>
  twitter?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
  website?: Maybe<Scalars['String']>
}

export type Buyer = {
  __typename?: 'Buyer'
  supply: Scalars['Int']
  user: User
}

export type CreateSellingInput = {
  nftId: Scalars['String']
  sellingVoucher: SellingVoucherInput
}

export type LoginInput = {
  ethAddress: Scalars['String']
  signature: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createNft: Nft
  createSelling: Selling
  generateVerificationToken: Scalars['Int']
  login: Auth
  unpinAll: Scalars['Boolean']
  updateUser: User
  uploadProfilePicture: User
}

export type MutationCreateNftArgs = {
  NFTFile: Scalars['Upload']
  data: NftInput
  pictureFile: Scalars['Upload']
}

export type MutationCreateSellingArgs = {
  createSellingInput: CreateSellingInput
}

export type MutationGenerateVerificationTokenArgs = {
  data: VerificationTokenInput
}

export type MutationLoginArgs = {
  data: LoginInput
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
  contractAddress: Scalars['String']
  creator?: Maybe<User>
  filePictureUrl: Scalars['String']
  fileUrl: Scalars['String']
  id: Scalars['String']
  ipfsUrl: Scalars['String']
  licenseOwners?: Maybe<Array<NftOwner>>
  masterOwner: NftOwner
  metadata: NftMetadata
  supply: Scalars['Float']
  tokenId?: Maybe<Scalars['Float']>
  transactionHash?: Maybe<Scalars['String']>
}

export type NftFilter = {
  contractAddress?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['String']>
  ipfsUrl?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['Float']>
}

export type NftInput = {
  chainId?: InputMaybe<Scalars['Float']>
  metadata: NftMetadataInput
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

export type NftsFilter = {
  creatorEthAddress: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  me: User
  nft?: Maybe<Nft>
  nfts?: Maybe<Array<Nft>>
  sellings?: Maybe<Array<Selling>>
  user?: Maybe<User>
}

export type QueryNftArgs = {
  filter: NftFilter
}

export type QueryNftsArgs = {
  filter?: InputMaybe<NftsFilter>
  limit: Scalars['Int']
  skip: Scalars['Int']
}

export type QuerySellingsArgs = {
  filter?: InputMaybe<SellingsFilter>
  limit: Scalars['Int']
  skip: Scalars['Int']
}

export type QueryUserArgs = {
  ethAddress: Scalars['String']
}

export type Selling = {
  __typename?: 'Selling'
  buyers: Array<Buyer>
  id: Scalars['String']
  marketplaceContractAddress: Scalars['String']
  nft?: Maybe<Nft>
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
  nftContractAddress: Scalars['String']
  price: Scalars['Float']
  sellCount: Scalars['Int']
  signature: Scalars['String']
  supply: Scalars['Int']
  tokenId: Scalars['Int']
  tokenUri: Scalars['String']
}

export type SellingVoucherInput = {
  currency: Scalars['String']
  isMaster: Scalars['Boolean']
  nftContractAddress: Scalars['String']
  price: Scalars['Float']
  sellCount: Scalars['Int']
  signature: Scalars['String']
  supply: Scalars['Int']
  tokenId: Scalars['Int']
  tokenUri: Scalars['String']
}

export type SellingsFilter = {
  nftContractAddress?: InputMaybe<Scalars['String']>
  nftId?: InputMaybe<Scalars['String']>
  nftType?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['Int']>
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

export type VerificationTokenInput = {
  ethAddress: Scalars['String']
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
    sellingStatus: string
    seller: {
      __typename?: 'User'
      id: string
      name?: string | null
      ethAddress?: string | null
    }
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
    contractAddress: string
    fileUrl: string
    filePictureUrl: string
    ipfsUrl: string
    transactionHash?: string | null
    supply: number
    chainId: number
    masterOwner: {
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        ethAddress?: string | null
      }
    }
    metadata: { __typename?: 'NftMetadata'; name: string; description: string }
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      ethAddress?: string | null
      profileImage?: string | null
    } | null
    licenseOwners?: Array<{
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        id: string
        name?: string | null
        ethAddress?: string | null
      }
    }> | null
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
    contractAddress: string
    fileUrl: string
    filePictureUrl: string
    ipfsUrl: string
    chainId: number
    transactionHash?: string | null
    masterOwner: {
      __typename?: 'NftOwner'
      user: {
        __typename?: 'User'
        name?: string | null
        ethAddress?: string | null
      }
    }
    metadata: { __typename?: 'NftMetadata'; name: string; description: string }
    creator?: {
      __typename?: 'User'
      id: string
      name?: string | null
      ethAddress?: string | null
      profileImage?: string | null
    } | null
    licenseOwners?: Array<{
      __typename?: 'NftOwner'
      supply: number
      user: {
        __typename?: 'User'
        name?: string | null
        ethAddress?: string | null
      }
    }> | null
  }> | null
}

export type SellingsQueryVariables = Exact<{
  filter?: InputMaybe<SellingsFilter>
  skip: Scalars['Int']
  limit: Scalars['Int']
}>

export type SellingsQuery = {
  __typename?: 'Query'
  sellings?: Array<{
    __typename?: 'Selling'
    id: string
    nftType: string
    marketplaceContractAddress: string
    sellingStatus: string
    transactionHash?: string | null
    seller: {
      __typename?: 'User'
      ethAddress?: string | null
      name?: string | null
    }
    buyers: Array<{
      __typename?: 'Buyer'
      supply: number
      user: {
        __typename?: 'User'
        ethAddress?: string | null
        name?: string | null
      }
    }>
    sellingVoucher: {
      __typename?: 'SellingVoucher'
      nftContractAddress: string
      price: number
      tokenId: number
      tokenUri: string
      isMaster: boolean
      signature: string
      sellCount: number
      supply: number
      currency: string
    }
    nft?: {
      __typename?: 'Nft'
      id: string
      tokenId?: number | null
      contractAddress: string
      fileUrl: string
      filePictureUrl: string
      ipfsUrl: string
      transactionHash?: string | null
      supply: number
      chainId: number
      masterOwner: {
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          ethAddress?: string | null
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
        ethAddress?: string | null
        profileImage?: string | null
      } | null
      licenseOwners?: Array<{
        __typename?: 'NftOwner'
        supply: number
        user: {
          __typename?: 'User'
          id: string
          name?: string | null
          ethAddress?: string | null
        }
      }> | null
    } | null
  }> | null
}
