import { useRouter } from 'next/router'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Home = () => {
  const router = useRouter()

  return (
    <>
    <h2>Hello world</h2>

    <Button variant='outlined' onClick={() => router.push('/login')} >login</Button>
    <Button variant='outlined' onClick={() => router.push('/signup')} >Sign Up</Button>

    </>
  )
}
export default Home
