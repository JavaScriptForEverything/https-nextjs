import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, showError } from '../store/userReducer'

import { wrapper } from '../store'
import { parseCookies, setCookie } from 'nookies'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'


const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)

  const [ fields, setFields ] = useState({
    email: ''
  })
  const [ fieldsError, setFieldsError ] = useState({
    email: 'empty email address'
  })

  // console.log({ user })

  const changeHandler = (name) => (evt) => {
    setFields({...fields, [name]: evt.target.value })
  }

  const submitHandler = (evt) => {
    evt.preventDefault()

    dispatch(loginUser(fields))

    console.log(fields)
  }

  return (
    <>
    <Button variant='outlined' onClick={() => router.push('/')} >Home</Button>
    <Button variant='outlined' onClick={() => router.push('/signup')} >Sign Up</Button>

    <form onSubmit={submitHandler}>
      <TextField 
          label='Email Address'
          placeholder='abc@gmail.com'
          type='email'
          fullWidth

          value={fields['email']}
          onChange={changeHandler('email')}
          error={!fields['email']}
          helperText={fieldsError['email']}
      />
      <Button
        variant='outlined'
        type='submit'
      >Login</Button>
    </form>

    </>
  )
}
export default Login

export const getServerSideProps = wrapper.getServerSideProps( ({ dispatch }) => (ctx) => {
  // setCookie(ctx, 'token', 'mytoken', {
  //   httpOnly: true,
  //   secure: true,
  //   maxAge: 60*60*24*30,
  //   path: '/',
  // })
  const { token } = parseCookies(ctx, 'token')
  console.log({ token })

  // dispatch(showError(''))

  return { props: { } }
})