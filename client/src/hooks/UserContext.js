import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const putUserData = async userInfo => {
    setUserData(userInfo)

    await localStorage.setItem('codeburger:userData', JSON.stringify(userInfo))
  }

  const logoutUser = async () => {
    await localStorage.removeItem('codeburger:userData')
  }

  useEffect(() => {
    async function loadUserData() {
      const clientInfo = await JSON.parse(
        localStorage.getItem('codeburger:userData')
      )

      if (clientInfo) {
        setUserData(clientInfo)
      }
    }

    loadUserData()
  }, [])

  return (
    <UserContext.Provider value={{ putUserData, userData, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
