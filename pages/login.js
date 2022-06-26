import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, showError } from '../store/userReducer'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'

const Login = () => {
  const dispatch = useDispatch()
  const [ avatar, setAvatar ] = useState({ public_url: '/users/user-2.jpg' })
  const [ fields, setFields ] = useState({
    avatar: ''
  })

  const { user, error } = useSelector(state => state.users)
  // console.log(avatar)

  const changeHandler = (evt) => {
    const image = evt.target.files[0]
    const isImage = image.type.match('image/(jpeg|png)')?.[1]

    if(!isImage) {
      return dispatch(showError('Only "jpg/jpeg" or "png" image allowed'))
    } else dispatch(showError(''))
    
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = () => {
      if(reader.readyState === 2) {
        setAvatar({
          public_url: reader.result,
          size: image.size
        })
      }
    }
  }

  const submitHandler = (evt) => {
    evt.preventDefault()

    dispatch(loginUser({ ...fields, avatar }))
  }

  return (
    <>

    { error &&  <Typography>{error}</Typography> }

    <Image 
      // layout='responsive'
      width={150}
      height={150}
      src={avatar.public_url}
    />

    <form onSubmit={submitHandler}>
      <TextField 
        variant='outlined'
        // margin='dense'
        type='file'
        // value={avatar}
        onChange={changeHandler}
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
