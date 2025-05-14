import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import { FiMenu, FiX } from 'react-icons/fi'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  // Fetch blog data
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('https://blog-hqx2.onrender.com/blog')
      const data = await response.json()
      setBlogs(data.blogs || data)
    }

    fetchBlogs()
  }, [])

  // Initialize Swiper after blogs are fetched
  useEffect(() => {
    if (blogs.length > 0) {
      new Swiper('.swiper', {
        slidesPerView: 1,
        loop: false,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    }
  }, [blogs])

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div>
      {/* Main Navbar */}
      <header className='bg-gradient-to-r from-teal-500 to-blue-600 shadow-xl sticky top-0 z-50'>
        <nav className='container mx-auto px-6 py-4 flex justify-between items-center'>
          {/* Logo */}
          <Link to='/' className='text-3xl font-extrabold text-white'>
            BlogMaster
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              to='/'
              className='text-white hover:text-teal-200 font-medium transition duration-300 transform hover:scale-105'
            >
              Discover Blog Posts
            </Link>
            <Link
              to='/myblog'
              className='text-white hover:text-teal-200 font-medium transition duration-300 transform hover:scale-105'
            >
              My Blog
            </Link>
            <Link
              to='/create-blog'
              className='bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300 font-medium transform hover:scale-105'
            >
              Create New Blog
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-white focus:outline-none text-3xl'
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className='md:hidden bg-blue-600 shadow-lg border-t'>
            <div className='px-6 py-4 flex flex-col space-y-4'>
              <Link
                to='/'
                className='text-white hover:text-teal-200 font-medium transition duration-300 transform hover:scale-105'
                onClick={toggleMenu}
              >
                Discover Blog Posts
              </Link>
              <Link
                to='/myblog'
                className='text-white hover:text-teal-200 font-medium transition duration-300 transform hover:scale-105'
                onClick={toggleMenu}
              >
                My Blog
              </Link>
              <Link
                to='/create-blog'
                className='bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition duration-300 transform hover:scale-105'
                onClick={toggleMenu}
              >
                Create New Blog
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Swiper for blog posts */}
      {blogs.length > 0 && (
        <div className='swiper mt-10'>
          <div className='swiper-wrapper'>
            {blogs.slice(0, 4).map(blog => (
              <div className='swiper-slide' key={blog._id}>
                <Link
                  to={`/singleblogs/${blog._id}`}
                  className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105 flex flex-col md:flex-row'
                >
                  {/* Left - Image */}
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className='w-full md:w-1/2 h-64 object-cover'
                    />
                  ) : (
                    <div className='w-full md:w-1/2 h-64 bg-gray-200 flex items-center justify-center text-gray-400'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-16 w-16'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                  )}

                  {/* Right - Text */}
                  <div className='p-5 md:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                      {blog.title}
                    </h2>
                    <div className='text-sm text-gray-500 mb-2'>
                      By:{' '}
                      <span className='text-teal-600 font-medium'>
                        Bikash KC
                      </span>
                      {' • '}
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <p className='text-gray-700 text-sm leading-relaxed line-clamp-4'>
                      {blog.content}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/* Swiper Controls */}
          <div className='swiper-button-next'></div>
          <div className='swiper-button-prev'></div>
          <div className='swiper-pagination'></div>
        </div>
      )}

      {/* Grid for remaining blogs */}
      {blogs.length > 4 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-10'>
          {blogs.slice(4).map(blog => (
            <Link
              to={`/singleblogs/${blog._id}`}
              key={blog._id}
              className='bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden transition hover:shadow-2xl transform hover:scale-105 flex flex-col'
            >
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='w-full h-52 object-cover'
                />
              ) : (
                <div className='w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-16 w-16'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
              )}
              <div className='p-5 flex flex-col flex-grow'>
                <h2 className='text-xl font-semibold text-gray-800 mb-2 truncate hover:text-teal-600'>
                  {blog.title}
                </h2>
                <div className='text-xs text-gray-500 mb-3 space-x-2'>
                  <span>
                    By:{' '}
                    <span className='font-medium text-teal-700'>
                      {blog.author?.name || 'Unknown Author'}
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className='text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3'>
                  {blog.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
