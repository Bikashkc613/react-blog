import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  //get user details
  const { user } = useContext(AuthContext)
  return <div>{user.name}</div>
}

export default Navbar
