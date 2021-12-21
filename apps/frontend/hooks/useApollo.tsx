import { useEffect, useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { initializeApollo } from '../lib/apolloClient'

export function useApollo(initialState: Record<string, unknown>) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { token } = useAppContext()
  const apolloClientResponse = useMemo(
    () => initializeApollo({ initialState }),
    [initialState]
  )

  useEffect(() => {
    if (process.browser) {
      apolloClientResponse.authorizedWsLink.resetLink()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, process.browser])

  return apolloClientResponse.apolloClient
}
