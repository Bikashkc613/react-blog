import { Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FiUploadCloud } from 'react-icons/fi'

const CreateBlog = () => {
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const handleImageChange = event => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async values => {
    const formData = new FormData()
    formData.append('title', values?.title)
    formData.append('content', values?.content)
    if (image) formData.append('image', image)
    formData.append('author', user?._id)

    try {
      await axios.post('https://blog-hqx2.onrender.com/blog/create', formData)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex justify-center items-center py-10'>
      <div className='bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl'>
        <h1 className='text-3xl font-semibold text-center text-teal-700 mb-6'>
          Create a New Blog Post
        </h1>

        <Formik
          initialValues={{
            title: '',
            content: ''
          }}
          onSubmit={values => {
            handleSubmit(values)
          }}
        >
          <Form className='space-y-6'>
            {/* Blog Title */}
            <div>
              <label
                htmlFor='title'
                className='text-lg font-medium text-gray-700 block mb-2'
              >
                Blog Title
              </label>
              <Field
                type='text'
                name='title'
                placeholder='Enter your blog title'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-300'
                required
              />
            </div>

            {/* Blog Content */}
            <div>
              <label
                htmlFor='content'
                className='text-lg font-medium text-gray-700 block mb-2'
              >
                Blog Content
              </label>
              <Field
                as='textarea'
                name='content'
                placeholder='Write your blog content here'
                rows='6'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-300'
                required
              />
            </div>

            {/* Blog Image Upload */}
            <div className='flex flex-col items-center justify-center space-y-2 mt-4'>
              <label
                htmlFor='image'
                className='text-lg font-medium text-gray-700 block mb-2'
              >
                Upload a Cover Image
              </label>
              <div className='flex flex-col items-center justify-center space-y-2'>
                <input
                  type='file'
                  name='image'
                  onChange={event => handleImageChange(event)}
                  className='hidden'
                  accept='image/*'
                />
                <label
                  htmlFor='image'
                  className='flex items-center justify-center px-6 py-4 bg-teal-500 text-white rounded-lg cursor-pointer transition hover:bg-teal-600'
                >
                  <FiUploadCloud className='mr-2' />
                  <span>{image ? image.name : 'Choose an image'}</span>
                </label>
                {image && (
                  <div className='mt-2 text-sm text-gray-500'>
                    {image.name} ({(image.size / 1024).toFixed(2)} KB)
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                className='w-full p-4 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition duration-300'
              >
                Submit Blog
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default CreateBlog
