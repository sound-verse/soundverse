import { useEthers } from '@usedapp/core'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { gql, useMutation, useQuery } from '@apollo/client'
import link from 'next/link'
import { useAppContext } from '../context/AppContext'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

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
  const { jwtToken, setAuthToken } = useAppContext()
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>(undefined)
  const [jwtUser, setJwtUser] = useState<JwtObject>(undefined)
  const { data, loading, refetch } = useQuery(ME)

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
    !!getJwtUser(Cookies.get('JWT_TOKEN'))?.ethAddress
  )
  useEffect(() => {
    if (!loading && data && jwtUser) {
      if (jwtUser.ethAddress !== data.me.ethAddress) {
        refetch()
      }
      setLoggedInUser(data.me)
    }
  }, [jwtUser, loading, data])

  useEffect(() => {
    setAuthenticated(!!getJwtUser(jwtToken)?.ethAddress)
    setJwtUser(getJwtUser(jwtToken))
  }, [setJwtUser, jwtToken])

  const authenticate = useCallback(
    async (library: JsonRpcProvider, account: string): Promise<void> => {
      try {
        const nonce = await generateVerificationToken({
          variables: { data: { ethAddress: account } },
        })

        const msg = `To authenticate, please sign this message: ${account.toLowerCase()} (${
          nonce.data.generateVerificationToken
        })`

        const signature = await library.getSigner().signMessage(msg)

        const jwtToken = await login({
          variables: { data: { ethAddress: account, signature } },
        })

        setAuthToken(jwtToken.data.login.token)
      } catch (e) {
        console.log(`Authentication failed ${e}`)
      }
    },
    [generateVerificationToken, login, setAuthToken]
  )

  const logout = useCallback(async () => {
    setAuthToken('')
    setJwtUser(undefined)
    setAuthenticated(false)
    setLoggedInUser(undefined)
    await Cookies.set('JWT_TOKEN', '')
  }, [setAuthToken])

  return useMemo(
    () => ({
      authenticate,
      logout,
      authenticated,
      loggedInUser,
      loading,
      refetch,
    }),
    [authenticate, logout, authenticated, loggedInUser, loading, refetch]
  )
}
