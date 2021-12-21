import { useEthers } from '@usedapp/core'
import { useCallback, useEffect, useMemo } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { gql, useMutation } from '@apollo/client'
import link from 'next/link'
import { useAppContext } from '../context/AppContext'

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

  return useMemo(() => {
    const authenticate = async (library: Web3Provider, account: string) => {
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
    }

    return { authenticate }
  }, [])
}
