import { useEthers } from '@usedapp/core'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useAuthContext } from '../context/AuthContext'
import jwt_decode from 'jwt-decode'
import toast from 'react-hot-toast'
import {
  GenerateVerificationTokenMutation,
  GenerateVerificationTokenMutationVariables,
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MeQueryVariables,
  User,
} from '../common/graphql/schema.d'
import { LOGIN } from '../common/graphql/mutations/login.mutation'
import { GENERATE_VERIFICATION_TOKEN } from '../common/graphql/mutations/generate-verification-token.mutation'
import { ME } from '../common/graphql/queries/me.query'

export type JwtObject = {
  id?: string
  ethAddress?: string
  iat?: number
  exp?: number
}

export const useLogin = () => {
  const [generateVerificationToken] = useMutation<
    GenerateVerificationTokenMutation,
    GenerateVerificationTokenMutationVariables
  >(GENERATE_VERIFICATION_TOKEN)
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN)
  const { jwtToken, setAuthToken, setLoggedInUser } = useAuthContext()
  const { data, loading, refetch } = useQuery<MeQuery, MeQueryVariables>(ME)
  const {
    account,
    library: ethLibraray,
    activateBrowserWallet,
    deactivate,
    chainId,
  } = useEthers()

  const supportedNetworks = {
    local: {
      chainIds: [31337, 80001],
    },
    testflight: {
      chanIds: [80001],
    },
  }

  const networks = {
    31337: {
      name: 'Localhost',
    },
    80001: {
      name: 'Polygon Mumbai',
    },
  }

  const correctChainIds =
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'
      ? supportedNetworks.local.chainIds
      : supportedNetworks.testflight.chanIds

  const correctNetworkName = chainId && networks[correctChainIds[0]].name

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
    (authUser: User) => {
      setLoggedInUser(authUser)
      setAuthenticated(authUser ? true : false)
    },
    [setLoggedInUser]
  )

  useEffect(() => {
    if (!loading && data && jwtUser) {
      if (
        jwtUser.ethAddress?.toLowerCase() === data.me.ethAddress?.toLowerCase()
      ) {
        setAuthUser(data.me)
      }
    }
  }, [jwtUser, data])

  useEffect(() => {
    if (account && chainId && !correctChainIds.includes(chainId)) {
      toast.error(`Wrong network! Please change to ${correctNetworkName}`)
      logout()
    } else if (
      correctChainIds.includes(chainId) &&
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
    setAuthUser(undefined)
    setJwtUser(undefined)
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
