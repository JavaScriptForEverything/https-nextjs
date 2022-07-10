import path from 'path'
import { catchAsync, appError, uploadImage } from '../util'
import User from '../models/userModel'
import { serialize } from 'cookie'
import { sign } from 'jsonwebtoken'


export const signup = catchAsync( async (req, res, next) => {

  const PUBLIC_ROOT = path.join(__dirname, '../../../../../public')  // (/)  /.next/server/pages/api   => (/)  /public
  const destination = path.join(PUBLIC_ROOT, 'images', 'users')

  const { error, image } = await uploadImage(req.body.avatar, destination)
  if(error) return next(appError(error))


  // console.log({ avatar: image })
  const user = await User.create({ ...req.body, avatar: image })
  if(!user) return next(appError('User not saved into database'))

  res.status(201).json({
    status: 'success',
    user
  })
})



export const login = catchAsync( async (req, res, next) => {
	const { TOKEN_SECRET, TOKEN_EXPIRES } = process.env || {}
	const { email, password } = req.body

  const user = await User.findOne({ email })
  // console.log(user)

  const token = sign({ _id: user._id }, TOKEN_SECRET , { expiresIn: TOKEN_EXPIRES })
  res.setHeader('Set-Cookie', serialize('token', token, {
    maxAge: 60*60*24*30,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  }))

  user.password = undefined

  res.status(201).json({
    status: 'success',
    user
  })
})


// POST 	/api/users/logout
// Problem: ajax request remove cookie but server-side dispatch not remove cookie.
export const logout = (req, res, next) => {

  res.setHeader('Set-Cookie', serialize('token', '', {
    expires: new Date(0),
    // maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
  }))

  res.status(201).json({ status: 'success' })
}
