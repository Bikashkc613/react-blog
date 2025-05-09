import React from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import img from '../assets/1550551-free-lord-krishna-krishna-image.jpg'

const Home = () => {
  const fetchBlogs = async () => {
    const response = await axios.get('https://blog-hqx2.onrender.com/blogs')
    console.log(response.data)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div>
      <div
        className='absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 object-cover'
        style={{
          backgroundImage: `url(${img})`
        }}
      >
        <div className='space-x-4'>
          <Link to='/signup'>
            <button
              className='px-6 py-3 bg-blue-600
           text-white rounded-full hover:bg-blue-700 transition duration-300'
              path='/Signup'
            >
              Sign Up
            </button>
          </Link>

          <Link to='/Login'>
            <button
              className='px-6 py-3 bg-transparent border-2 border-white
           text-white rounded-full hover:bg-white hover:text-black transition duration-300'
              path='/Login'
            >
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
