import { useEthers } from '@usedapp/core'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { gql, useMutation } from '@apollo/client'
import link from 'next/link'
import { useAppContext } from '../context/AppContext'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

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
export const useLogin = () => {
  const [generateVerificationToken] = useMutation(GENERATE_VERIFICATION_TOKEN)
  const [login] = useMutation(LOGIN)
  const { jwtToken, setAuthToken } = useAppContext()

  const isLoggedIn = useCallback(
    (jwtToken) => {
      if (jwtToken && jwtToken !== '') {
        const decodedJwtToken: any = jwt_decode(jwtToken)
        let currentDate = new Date()

        if (decodedJwtToken.exp * 1000 < currentDate.getTime()) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    [jwtToken]
  )

  const [authenticated, setAuthenticated] = useState<Boolean>(
    isLoggedIn(Cookies.get('JWT_TOKEN'))
  )

  useEffect(() => {
    setAuthenticated(isLoggedIn(jwtToken))
  }, [jwtToken])

  const authenticate = async (
    library: JsonRpcProvider,
    account: string
  ): Promise<void> => {
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
  }

  const logout = async () => {
    setAuthToken('')
    await Cookies.set('JWT_TOKEN', '')
  }

  return useMemo(
    () => ({ authenticate, logout, authenticated }),
    [authenticate, logout, authenticated]
  )
}
