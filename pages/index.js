import Typography from '@mui/material/Typography'
import { } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { loading, error } = useSelector(state => state.users)
  console.log({ loading, error })

  return (
    <>
    <h2>Hello world</h2>

    </>
  )
}
export default Home
