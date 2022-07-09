import { wrapper } from '../store'
import { test } from '../store/userReducer'
import { useRouter } from 'next/router'
import axios from 'axios'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Home = () => {
  const router = useRouter()

  const logoutHandler = async () => {

  	try {
	  	const { data: { status }} = await axios.post(`/api/users/logout`, {})
	  	if(status='success') router.push('/profile')

	  	router.push('/login')

  	} catch (err) {
  		console.log(err)
  	}
  }


  return (
    <>
    <h2>Hello world</h2>

    <Button variant='outlined' onClick={() => router.push('/login')} >login</Button>
    <Button variant='outlined' onClick={() => router.push('/signup')} >Sign Up</Button>
    <Button variant='outlined' onClick={logoutHandler} >Logout</Button>
    <Button variant='outlined' onClick={() => router.push('/about')} >About</Button>

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
