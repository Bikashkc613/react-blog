import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const MyBlog = () => {
  const [myBlog, setMyBlog] = useState([])
  const { user } = useContext(AuthContext)

  console.log(user)
  const fetchData = async () => {
    if (user) {
      const response = await axios.get(
        `https://blog-hqx2.onrender.com/blog/${user?._id}`
      )
      setMyBlog(response.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [user?._id])

  return (
    <div>
      <h1>My Blogs</h1>
      <div className='grid gap-12 grid-cols-3'>
        {myBlog?.map((blog, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <h1 className='font-bold text-xl'>{blog.title}</h1>
              <p className='text-gray-600 font-semibold'>{blog.content}</p>
              <img src={blog.image} alt='' className='h-96 w-full' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyBlog
