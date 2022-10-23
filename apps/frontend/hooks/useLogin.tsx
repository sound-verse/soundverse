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
import {
  useAccount,
  useConnectModal,
  useDisconnect,
  useSignMessage,
  useNetwork,
} from '@web3modal/react'

export type JwtObject = {
  id?: string
  ethAddress?: string
  iat?: number
  exp?: number
}

const getJwtUser = (jwtToken): JwtObject => {
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
}

export const useLogin = () => {
  const [generateVerificationToken] = useMutation<
    GenerateVerificationTokenMutation,
    GenerateVerificationTokenMutationVariables
  >(GENERATE_VERIFICATION_TOKEN)
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN)
  const { jwtToken, setAuthToken, setLoggedInUser } = useAuthContext()
  const { data, loading, refetch } = useQuery<MeQuery, MeQueryVariables>(ME, {
    fetchPolicy: 'no-cache',
  })
  const [authenticated, setAuthenticated] = useState<Boolean>(
    !!getJwtUser(jwtToken)?.ethAddress
  )
  const [jwtUser, setJwtUser] = useState<JwtObject>(getJwtUser(jwtToken))
  const { open, isOpen, close } = useConnectModal()
  const { address, status } = useAccount()
  const disconnect = useDisconnect()
  const { signMessage } = useSignMessage({ message: '' })
  const { chain } = useNetwork()

  useEffect(() => {
    if (status === 'disconnected') {
      logout()
    }
    if (status === 'connected') {
      try {
        authenticate()
      } catch (error) {
        console.log(error)
        logout()
      }
    }
  }, [status])

  useEffect(() => {
    if (!chain) {
      return
    }
    if (chain.unsupported) {
      logout()
    }
  }, [chain])

  useEffect(() => {
    if (!address || !jwtUser) {
      return
    }
    if (address.toLowerCase() !== jwtUser?.ethAddress.toLowerCase()) {
      logout()
    }
  }, [address, jwtUser])

  useEffect(() => {
    if (!loading && data && jwtUser) {
      if (
        jwtUser.ethAddress?.toLowerCase() === data.me.ethAddress?.toLowerCase()
      ) {
        setLoggedInUser(data.me)
      }
    }
  }, [jwtUser, data])

  const logout = useCallback(async () => {
    setAuthToken('')
    setLoggedInUser(undefined)
    setJwtUser(undefined)
    disconnect()
  }, [disconnect, setAuthToken, setLoggedInUser])

  const authenticate = useCallback(async (): Promise<void> => {
    try {
      const jwtUser = getJwtUser(jwtToken)

      if (jwtUser) {
        setJwtUser(jwtUser)
        setAuthenticated(true)
        refetch()
        return
      }

      const nonce = await generateVerificationToken({
        variables: { data: { ethAddress: address } },
        fetchPolicy: 'network-only',
      })

      const msg = `To authenticate, please sign this message: ${address.toLowerCase()} (${
        nonce.data.generateVerificationToken
      })`

      const signature = await signMessage({ message: msg })

      if (!signature) {
        throw Error('Signature not found')
      }

      const newJwtToken = await login({
        variables: { data: { ethAddress: address, signature } },
        fetchPolicy: 'network-only',
      })

      setAuthToken(newJwtToken.data.login.token)
      setJwtUser(getJwtUser(newJwtToken.data.login.token))
      setAuthenticated(true)
      refetch()
    } catch (e) {
      logout()
      console.log(`Authentication failed ${e}`)
    }
  }, [
    generateVerificationToken,
    address,
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
      open,
      isOpen,
    }),
    [logout, authenticated, loading, refetch, open, isOpen]
  )
}
