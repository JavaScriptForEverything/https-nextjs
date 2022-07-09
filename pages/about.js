import { wrapper } from '../store'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { test } from '../store/userReducer'

import Button from '@mui/material/Button'

const About = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.user )

	console.log(user)

	const clickHandler = () => {
		const data = {
			name: 'riajul',
			email: 'abc@gmail.com'
		}
		dispatch(test(data))
	}

	return (
		<>
    	<Button variant='outlined' onClick={() => router.push('/')} >Home</Button>
			<Button variant='outlined'onClick={clickHandler} >Test</Button>
		</>
	)
}
export default About


export const getServerSideProps = wrapper.getServerSideProps((store) => ({ req }) => {

	// let state = store.getState()
	// 		state = state.user

	// 		console.log(state)

	const data = {
		email: 'abc@gmail.com',
		authenticated: true
	}
	store.dispatch(test(data))

})
