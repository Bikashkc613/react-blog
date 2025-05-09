import React, { useContext } from 'react'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext)

  if (!token) {
    return <navigate to={'/Login'} />
  }

  return children
}

export default ProtectedRoute
