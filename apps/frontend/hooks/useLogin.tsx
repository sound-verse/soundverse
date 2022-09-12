import { useEthers } from '@usedapp/core'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const { jwtToken, setAuthToken, setLoggedInUser, authUser } = useAuthContext()
  const { data, loading, refetch } = useQuery<MeQuery, MeQueryVariables>(ME, {
    fetchPolicy: 'no-cache',
  })
  const authenticationPending = useRef(false)

  const {
    account,
    library: ethLibrary,
    activateBrowserWallet,
    deactivate,
    activate,
    chainId,
    active,
  } = useEthers()

  const supportedNetworks = {
    local: {
      chainIds: [31337, 5],
    },
    testflight: {
      chanIds: [5],
    },
    main: {
      chanIds: [1],
    },
  }

  const networks = {
    31337: {
      name: 'Localhost',
    },
    5: {
      name: 'Görli',
    },
    1: {
      name: 'Ethereum',
    },
  }

  let correctChainIds

  switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case 'local': {
      supportedNetworks.local.chainIds
      break
    }
    case 'testflight': {
      supportedNetworks.testflight.chanIds
      break
    }
    case 'main': {
      supportedNetworks.main.chanIds
      break
    }
  }

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

  const loginUser = useCallback(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  useEffect(() => {
    if (authUser && chainId && account && active) {
      setAuthenticated(true)
    } else if (jwtUser && (!chainId || !account || !active)) {
      setAuthenticated(false)
      activateBrowserWallet()
    } else {
      setAuthenticated(false)
      logout()
    }
  }, [account, active, authUser, chainId, loginUser])

  useEffect(() => {
    if (account && chainId && !correctChainIds.includes(chainId)) {
      toast.error(`Wrong network! Please change to ${correctNetworkName}`)
      logout()
    } else if (
      correctChainIds.includes(chainId) &&
      account &&
      account.toLowerCase() !== jwtUser?.ethAddress.toLowerCase()
    ) {
      authenticate()
    }
  }, [
    account,
    chainId,
    correctChainIds,
    correctNetworkName,
    jwtUser?.ethAddress,
  ])

  const logout = useCallback(async () => {
    setAuthToken('')
    setAuthUser(undefined)
    setJwtUser(undefined)
    deactivate()
  }, [deactivate, setAuthToken, setLoggedInUser])

  const authenticate = useCallback(async (): Promise<void> => {
    if (authenticationPending.current) {
      return
    }
    authenticationPending.current = true
    try {
      const nonce = await generateVerificationToken({
        variables: { data: { ethAddress: account } },
        fetchPolicy: 'network-only',
      })

      const msg = `To authenticate, please sign this message: ${account.toLowerCase()} (${
        nonce.data.generateVerificationToken
      })`

      const signature = await ethLibrary.getSigner().signMessage(msg)

      const jwtToken = await login({
        variables: { data: { ethAddress: account, signature } },
        fetchPolicy: 'network-only',
      })

      setAuthToken(jwtToken.data.login.token)
      setJwtUser(getJwtUser(jwtToken.data.login.token))
      refetch()
    } catch (e) {
      logout()
      console.log(`Authentication failed ${e}`)
    }
    authenticationPending.current = false
  }, [
    generateVerificationToken,
    account,
    ethLibrary,
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
