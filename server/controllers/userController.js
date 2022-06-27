import path from 'path'
import { catchAsync, appError, uploadImage } from '../util'


export const signup = catchAsync( async (req, res, next) => {

  const PUBLIC_ROOT = path.join(__dirname, '../../../../../public')  // (/)  /.next/server/pages/api   => (/)  /public
  const { error, image } = await uploadImage(req.body.avatar, PUBLIC_ROOT)
  if(error) return next(appError(error))

  console.log({ avatar: image })

  res.status(200).json({
    status: 'success',
    user: {
      avatar: image
    }
  })
})

export const login = catchAsync( async (req, res, next) => {

  // const PUBLIC_ROOT = path.join(__dirname, '../../../../public')  // (/)  /.next/server/pages/api   => (/)  /public
  // const { error, image } = await uploadImage(req.body.avatar, PUBLIC_ROOT)
  // if(error) return next(appError(error))


  // res.setHeader('set-cookie', `token=mytoken; path=/; httponly; secure; expires=${Date.now() + 40000}` )
  // const token = req.headers?.cookie.split('=').pop()
  // console.log({ token })

  res.status(200).json({
    status: 'success',
    user: {
      // avatar: image
    }
  })
})