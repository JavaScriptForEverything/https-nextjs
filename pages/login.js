import { verify } from 'jsonwebtoken'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, showError, authenticateUser } from '../store/userReducer'

import { wrapper } from '../store'
import { formValidator } from '../uitl'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const inputItems = [
  { name: 'email', type:'email', label: 'Email Address' },
  { name: 'password', type:'password', label: 'Password' },
  // { name: 'confirmPassword', type:'password', label: 'confirmPassword' },
]
const arrayObject = {}
inputItems.forEach(obj => arrayObject[obj.name] = '')

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  const [ fields, setFields ] = useState({ ...arrayObject })
  const [ fieldsError, setFieldsError ] = useState({ ...arrayObject })

  const { status } = useSelector(state => state.user)

  useEffect(() => {
  	if(status === 'success') {
  		dispatch( authenticateUser(true) )
  		router.push('/profile')
  	}
  }, [status])

  const changeHandler = (name) => (evt) => {
    setFields({...fields, [name]: evt.target.value })
  }

  const submitHandler = (evt) => {
    evt.preventDefault()

    if( !formValidator(fields, setFieldsError)) return console.log(fieldsError)
    // console.log(fields)
    dispatch(loginUser(fields))
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

export const getServerSideProps = (ctx) => {
	const { token } = ctx.req.cookies || {}
	if( !token )	return { props: {} }

	try {
		const TOKEN_SECRET = process.env.TOKEN_SECRET
		const { _id, iat } = verify(token, TOKEN_SECRET)

		return { redirect: {
			destination: '/profile',
			parmanent: false
		}}

	} catch (err) {
		console.log(err.message)
	}

	return { props: {} }
}
