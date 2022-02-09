import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import Cookies from 'js-cookie'

const AppContext = createContext(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('No context provided')
  }
  return context
}

export const AppProvider: FC = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('JWT_TOKEN'))

  const setAuthToken = (jwtToken: string) => {
    if (!jwtToken) {
      Cookies.remove('JWT_TOKEN')
    } else {
      Cookies.set('JWT_TOKEN', jwtToken)
    }
    setJwtToken(jwtToken)
  }

  const value = useMemo(
    () => ({
      jwtToken,
      setAuthToken,
    }),
    [jwtToken, setAuthToken]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
