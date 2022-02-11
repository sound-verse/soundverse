import { useEffect, useMemo } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { initializeApollo } from '../lib/apolloClient'

export function useApollo(initialState: Record<string, unknown>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { jwtToken } = useAuthContext()
  const apolloClientResponse = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  )

  useEffect(() => {
    if (process.browser) {
      apolloClientResponse.authorizedWsLink.resetLink()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtToken, process.browser])

  return apolloClientResponse.apolloClient
}
