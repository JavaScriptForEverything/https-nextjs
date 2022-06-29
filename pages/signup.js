import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser, showError } from '../store/userReducer'

import { formValidator, readAsDataURL } from '../uitl'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import AddIcon from '@mui/icons-material/Add'




const Signup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [ avatar, setAvatar ] = useState('')
  const [ fields, setFields ] = useState({
    // avatar: ''
  })
  const [ fieldsError, setFieldsError ] = useState({
    avatar: ''
  })

  const { user, error } = useSelector(state => state.users)
  // console.log(user)

  const changeHandler = (evt) => {
    const file = evt.target.files[0]
    const { error: imageError } = readAsDataURL(file, setAvatar, { pdf: false })

    if(imageError) {
      return dispatch(showError('Only "jpg/jpeg" or "png" image allowed'))
    } else dispatch(showError(''))

    if(!formValidator(fields, setFieldsError)) return
    setFields({ ...fields })
  }


  const submitHandler = (evt) => {
    evt.preventDefault()

    // const isFormValid = formValidator(fields, setFieldsError)
    // console.log( isFormValid )
    if(!formValidator(fields, setFieldsError)) return
    console.log( fields )

    // dispatch(signUpUser({ ...fields, avatar }))
  }

  return (
    <>
    <Button variant='outlined' onClick={() => router.push('/')} >Home</Button>
    <Button variant='outlined' onClick={() => router.push('/login')} >Login</Button>

    { error &&  <Typography>{error}</Typography> }

    { avatar?.public_url && (
      <Image 
        width={150}
        height={150}
        src={avatar.public_url}
      />
    )}

    <form onSubmit={submitHandler}>
      <TextField 
        variant='outlined'
        type='file'
        onChange={changeHandler}

        error={!fields['avatar'] || !!fieldsError['avatar']}
        helperText={fieldsError['avatar']}
      />
      <Button
        variant='outlined'
        type='submit'
      >Sign up</Button>
    </form>
    </>
  )
}
export default Signup
