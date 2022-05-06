import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import Cookies from 'js-cookie'
import { AuthUser } from '../common/graphql/schema'

const AuthContext = createContext(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('No context provided')
  }
  return context
}

export const AuthProvider: FC = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(Cookies.get('JWT_TOKEN'))
  const [authUser, setAuthUser] = useState<AuthUser>(undefined)

  const setAuthToken = useCallback((jwtToken: string) => {
    if (!jwtToken) {
      Cookies.remove('JWT_TOKEN')
    } else {
      Cookies.set('JWT_TOKEN', jwtToken)
    }
    setJwtToken(jwtToken)
  }, [])

  const setLoggedInUser = useCallback((authUser: AuthUser) => {
    setAuthUser(authUser)
  }, [])

  const value = useMemo(
    () => ({
      jwtToken,
      setAuthToken,
      setLoggedInUser,
      authUser,
    }),
    [jwtToken, setAuthToken, setLoggedInUser, authUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
