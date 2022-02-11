import { useCall, useEthers } from '@usedapp/core'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { gql, useMutation, useQuery } from '@apollo/client'
import link from 'next/link'
import { useAuthContext } from '../context/AuthContext'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import toast from 'react-hot-toast'

export type JwtObject = {
  id?: string
  ethAddress?: string
  iat?: number
  exp?: number
}

const GENERATE_VERIFICATION_TOKEN = gql`
  mutation generateVerificationToken($data: VerificationTokenInput!) {
    generateVerificationToken(data: $data)
  }
`

const LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      token
    }
  }
`

export type LoggedInUser = {
  id?: string
  name?: string
  description?: string
  ethAddress?: string
  twitter?: string
  instagram?: string
  soundcloud?: string
  discord?: string
  spotify?: string
  website?: string
  profileImage?: string
  verified?: Boolean
}

export const ME = gql`
  query me {
    me {
      name
      description
      ethAddress
      twitter
      instagram
      soundcloud
      discord
      spotify
      website
      profileImage
      verified
    }
  }
`

export const useLogin = () => {
  const [generateVerificationToken] = useMutation(GENERATE_VERIFICATION_TOKEN)
  const [login] = useMutation(LOGIN)
  const { jwtToken, setAuthToken, setLoggedInUser } = useAuthContext()
  const { data, loading, refetch } = useQuery(ME)
  const {
    account,
    library: ethLibraray,
    activateBrowserWallet,
    deactivate,
    chainId,
  } = useEthers()
  const correctChainId =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'local' ? 31337 : 80001
  const correctNetwork =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
      ? 'Localhost'
      : 'Polygon Mumbai'

  const getJwtUser = useCallback((jwtToken): JwtObject => {
    if (jwtToken && jwtToken !== '') {
      const decodedJwtToken: JwtObject = jwt_decode(jwtToken)
      let currentDate = new Date()
      if (decodedJwtToken.exp * 1000 < currentDate.getTime()) {
        return undefined
      } else {
        return {
          id: decodedJwtToken.id,
          ethAddress: decodedJwtToken.ethAddress,
        }
      }
    } else {
      return undefined
    }
  }, [])

  const [authenticated, setAuthenticated] = useState<Boolean>(
    !!getJwtUser(jwtToken)?.ethAddress
  )
  const [jwtUser, setJwtUser] = useState<JwtObject>(getJwtUser(jwtToken))

  const setAuthUser = useCallback(
    (authUser: LoggedInUser) => {
      setLoggedInUser(authUser)
      setAuthenticated(true)
    },
    [setLoggedInUser]
  )

  useEffect(() => {
    if (!loading && data && jwtUser) {
      if (
        jwtUser.ethAddress.toLowerCase() === data.me.ethAddress.toLowerCase()
      ) {
        setAuthUser(data.me)
      }
    }
  }, [jwtUser, data])

  useEffect(() => {
    if (authenticated && correctChainId !== chainId) {
      toast.error(`Wrong network! Please change to ${correctNetwork}`)
      logout()
    } else if (
      account &&
      account.toLowerCase() !== jwtUser?.ethAddress.toLowerCase()
    ) {
      setAuthUser(undefined)
      authenticate()
    }
    if (!account && authenticated) {
      activateBrowserWallet()
    }
  }, [account, chainId])

  const loginUser = useCallback(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  const logout = useCallback(async () => {
    setAuthToken('')
    setJwtUser(undefined)
    setAuthenticated(false)
    setLoggedInUser(undefined)
    deactivate()
  }, [deactivate, setAuthToken, setLoggedInUser])

  const authenticate = useCallback(async (): Promise<void> => {
    try {
      const nonce = await generateVerificationToken({
        variables: { data: { ethAddress: account } },
      })

      const msg = `To authenticate, please sign this message: ${account.toLowerCase()} (${
        nonce.data.generateVerificationToken
      })`

      const signature = await ethLibraray.getSigner().signMessage(msg)

      const jwtToken = await login({
        variables: { data: { ethAddress: account, signature } },
      })

      setAuthToken(jwtToken.data.login.token)
      setJwtUser(getJwtUser(jwtToken.data.login.token))
      refetch()
    } catch (e) {
      logout()
      console.log(`Authentication failed ${e}`)
    }
  }, [
    generateVerificationToken,
    account,
    ethLibraray,
    login,
    setAuthToken,
    getJwtUser,
    refetch,
    logout,
  ])

  return useMemo(
    () => ({
      logout,
      authenticated,
      loading,
      refetch,
      loginUser,
      chainId,
    }),
    [logout, authenticated, loading, refetch, loginUser, chainId]
  )
}
