import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, showError, resetSuccess } from '../store/userReducer'

import { formValidator, readAsDataURL } from '../uitl'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import AddIcon from '@mui/icons-material/Add'


const inputItems = [
  { name: 'email', type:'email', label: 'Email Address' },
  { name: 'password', type:'password', label: 'Password' },
  { name: 'confirmPassword', type:'password', label: 'confirmPassword' },
]
const arrayObject = {}
inputItems.forEach(obj => arrayObject[obj.name] = '')


const Signup = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [ avatar, setAvatar ] = useState('')
  const [ fields, setFields ] = useState({ ...arrayObject })
  const [ fieldsError, setFieldsError ] = useState({ ...arrayObject })

  const { user, error, status } = useSelector(state => state.user )
  // console.log(status)



  useEffect(() => {
  	if(status === 'success') {
  		dispatch(resetSuccess())
  		router.push('/login')
  	}
  }, [status])

  const changeHandler = (name) => (evt) => {
    setFields({...fields, [name]: evt.target.value })
  }
  const imageChangeHandler = (evt) => {
    const file = evt.target.files[0]
    const { error: imageError } = readAsDataURL(file, setAvatar, { pdf: false })

    if(imageError) {
      return dispatch(showError('Only "jpg/jpeg" or "png" image allowed'))
    } else dispatch(showError(''))

    if(!formValidator(fields, setFieldsError)) return
    // setFields({ ...fields })
  }


  const submitHandler = (evt) => {
    evt.preventDefault()

    // const isFormValid = formValidator(fields, setFieldsError)
    // console.log( isFormValid )
    // setFields({ ...fields, avatar })
    if(!formValidator(fields, setFieldsError)) return
    console.log({ ...fields, avatar })

    dispatch(signUpUser({ ...fields, avatar }))
  }

  return (
    <>
    <Box>
	    <Button variant='outlined' onClick={() => router.push('/')} >Home</Button>
	    <Button variant='outlined' onClick={() => router.push('/login')} >Login</Button>
    </Box>

    <Box>
    	{ error &&  <Typography>{error}</Typography> }
    </Box>

    { avatar?.secure_url && (
      <Image 
        width={150}
        height={150}
        src={avatar.secure_url}
      />
    )}

    <form onSubmit={submitHandler}>
      { inputItems.map(({ name, type, label }) => (
        <TextField key={name}
            label={label}
            placeholder={label}
            type={type}
            // fullWidth

            value={fields[name]}
            onChange={changeHandler(name)}
            error={!fields[name]}
            helperText={fieldsError[name]}
        />
      ))}
      <TextField 
        variant='outlined'
        type='file'
        onChange={imageChangeHandler}

        error={!fields['avatar']?.['secure_url'] || !!fieldsError['avatar']}
        helperText={fieldsError['avatar']}
      />

      <Box>
	      <Button variant='outlined'type='submit'>Sign up</Button>
      </Box>
    </form>
    </>
  )
}
export default Signup
