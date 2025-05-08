import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const postFormData = async values => {
    try {
      const response = await axios.post(
        'https://blog-hqx2.onrender.com/user/register',
        values
      )
      toast.success('user registered successfully')
    } catch (error) {
      toast.error('user registration failed')
    }
  }

  const formdata = [
    {
      label: 'Username',
      name: 'name',
      type: 'text'
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email'
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password'
    }
  ]
  return (
    <div className='flex min-h-screen w-full justify-center items-center'>
      <div className='felx w-[250px] items-center bg-white shadow-2xl rounded-xl p-4 justify-center'>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, 'Minimum 3 characters')
              .required('Username is required'),
            email: Yup.string().email().required('This field is required'),
            password: Yup.string()
              .min(8, 'minimum eight characters')
              .required('Password is required')
          })}
          onSubmit={values => {
            postFormData(values)
          }}
        >
          <Form className='w-full flex flex-col'>
            {formdata.map((value, index) => {
              return (
                <div key={index} className='flex flex-col'>
                  <label htmlFor={value.name}>{value.label}</label>
                  <Field
                    name={value.name}
                    type={value.type}
                    className='border-outline-none rounded-2xl pl-4'
                  />
                  <ErrorMessage
                    name={value.name}
                    component='div'
                    className='text-red-500'
                  />
                </div>
              )
            })}
            <ToastContainer />
            <button
              type='submit'
              className='flex justify-center bg-blue-500 p-1 text-sm text-white rounded-lg
                mt'
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register
