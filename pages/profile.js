import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { verify } from 'jsonwebtoken'
import { useDispatch, useSelector } from 'react-redux'
import { addUserToStore } from '../store/userReducer'

import Button from '@mui/material/Button'

const Profile = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	const { user } = useSelector(state => state.user)

	console.log({ user })

	useEffect(() => {
		dispatch(addUserToStore())
	}, [])

	return (
		<>
			Profile page
			<Button
				variant='outlined'
				onClick={() => router.push('/')}
			>Home</Button>
		</>
	)
}
export default Profile

export const getServerSideProps = (ctx) => {
	const { token } = ctx.req.cookies
	if( !token )	return { props: {} }

	try {
		const TOKEN_SECRET = process.env.TOKEN_SECRET
		const { _id, iat } = verify(token, TOKEN_SECRET)
		// console.log({ userId: _id })

	} catch (err) {
		console.log(err.message)

		return { redirect: {
			destination: '/login',
			parmanent: false
		}}
	}

	return { props: {} }
}
