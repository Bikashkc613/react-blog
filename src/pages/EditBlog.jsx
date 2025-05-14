import { Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const EditBlogs = () => {
  const [image, setImage] = useState(null)
  const location = useLocation()
  const { id } = useParams()

  console.log(location)
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const handleImageChange = event => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async values => {
    console.log(values)
    console.log(values, image, user)
    const formData = new FormData()
    formData.append('title', values?.title)
    console.log(formData)
    formData.append('content', values?.content)
    if (image) formData.append('image', image)
    formData.append('author', user?._id)

    try {
      await axios.put(`https://blog-hqx2.onrender.com/blog/${id}`, formData)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='mt-10 ml-10'>
      <Formik
        initialValues={{
          title: location.state.blog.title,

          content: location.state.blog.content
        }}
        onSubmit={values => {
          handleSubmit(values)
        }}
      >
        <Form>
          <label htmlFor='title' className='text-xl mr-4'>
            Title
          </label>
          <Field
            type='text'
            name='title'
            placeholder='enter blog title'
            className='border'
          />
          <label htmlFor='title' className='text-xl mr-4'>
            Content
          </label>
          <Field
            type='text'
            name='content'
            placeholder='enter blog content'
            className='border'
          />

          <div className='mt-4'>
            <label htmlFor='Image'>Upload blog image</label> <br />
            <input
              type='file'
              name='image'
              onChange={event => handleImageChange(event)}
              className='border bg-amber-300'
            />
          </div>

          <button
            type='submit'
            className='p-2 bg-blue-500 rounded-lg text-white mt-10 cursor-pointer'
          >
            Submit blog
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default EditBlogs
