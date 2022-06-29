import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, showError } from '../store/userReducer'

import { wrapper } from '../store'
import { parseCookies, setCookie } from 'nookies'
import { formValidator } from '../uitl'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const inputItems = [
  { name: 'email', type:'email', label: 'Email Address' },
  { name: 'password', type:'password', label: 'Password' },
  { name: 'confirmPassword', type:'password', label: 'confirmPassword' },
]
const arrayObject = {}
inputItems.forEach(obj => arrayObject[obj.name] = '')

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)

  const [ fields, setFields ] = useState({ ...arrayObject })
  const [ fieldsError, setFieldsError ] = useState({ ...arrayObject })

  // console.log({ user })

  const changeHandler = (name) => (evt) => {
    setFields({...fields, [name]: evt.target.value })
  }

  const submitHandler = (evt) => {
    evt.preventDefault()
    dispatch(loginUser(fields))

    if( !formValidator(fields, setFieldsError)) return 
    console.log(fields)
  }

  return (
    <>
    <Button variant='outlined' onClick={() => router.push('/')} >Home</Button>
    <Button variant='outlined' onClick={() => router.push('/signup')} >Sign Up</Button>

    <form onSubmit={submitHandler} noValidate>
      { inputItems.map(({ name, type, label }) => (
        <TextField key={name}
            label={label}
            placeholder={label}
            type={type}
            fullWidth

            value={fields[name]}
            onChange={changeHandler(name)}
            error={!fields[name]}
            helperText={fieldsError[name]}
        />
      ))}
      <Button
        variant='outlined'
        type='submit'
      >Login</Button>
    </form>

    </>
  )
}
export default Login

// export const getServerSideProps = wrapper.getServerSideProps( ({ dispatch }) => (ctx) => {
//   // setCookie(ctx, 'token', 'mytoken', {
//   //   httpOnly: true,
//   //   secure: true,
//   //   maxAge: 60*60*24*30,
//   //   path: '/',
//   // })
//   const { token } = parseCookies(ctx, 'token')
//   console.log({ token })

//   // dispatch(showError(''))

//   return { props: { } }
// })