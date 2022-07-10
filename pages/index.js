import { wrapper } from '../store'
import { logoutUser } from '../store/userReducer'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const logoutHandler = async () => {

  	dispatch(logoutUser())
  }


  return (
    <>
    <h2>Hello world</h2>

    <Button variant='outlined' onClick={() => router.push('/login')} >login</Button>
    <Button variant='outlined' onClick={() => router.push('/signup')} >Sign Up</Button>
    <Button variant='outlined' onClick={logoutHandler} >Logout</Button>
    <Button variant='outlined' onClick={() => router.push('/about')} >About</Button>
    <Button variant='outlined' onClick={() => router.push('/profile')} >Profile</Button>

    </>
  )
}
export default Home



// export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => ({ req }) => {

// 	// const data = {
// 	// 	email: 'abc@gmail.com'
// 	// }
// 	// dispatch(test(data))

// })
