import sharp from 'sharp'
import { nanoid } from 'nanoid'


/*  export const signup = catchAsync( async (req, res, next) => {
      ...
      res.status(200).json({ status: 'success', user: { avatar: image } })
    }) */
export const catchAsync = fn => (req, res, next) => {
  return fn(req, res, next).catch(next)
}


/*  if(error) return next(appError(error)) */
export const appError = (message, statusCode=400, errorType='error') => {
  const err = new Error(message)
  err.statusCode = statusCode
  err.errorType = errorType

  return err
}


/*  /pages/api/users/index.js
      const router = nc({ onError: globalErrorHandler })
      router.post( userController.signup ) */
export const onError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.errorType || 'failed',
    message: err.message,
    stack: err.stack
  })
}


/* const PUBLIC_ROOT = path.join(__dirname, '../../../../public')  
    const { error, image } = await uploadImage(req.body.avatar, PUBLIC_ROOT)
    if(error) return next(appError(error))

    res.status(200).json({ 
      status: 'success', 
      user: { avatar: image } 
    }) */
export const uploadImage = async (image={}, destination) => {
  let error = ''

  // 1. Get image as dataURL
  const dataURL = image?.secure_url
  if(!dataURL) return error = 'No image found'

  const isValidDataURL = dataURL.startsWith('data:')
  if( !isValidDataURL ) return error = `upload image instead of '${dataURL}'`

  // 2. remove metadata so that only base64 encoded data remains
  const base64 = dataURL.split(';base64,').pop()    

  // 3. convert base64 data to Binary buffer
  const buf = Buffer.from(base64, 'base64')         

  // 4. Save image from buffer  
  const public_id = nanoid()
  const file = `${destination}/${public_id}.jpg`
  const secure_url = file.split('/public').pop()

  await sharp(buf)
    .resize(150, 150)
    .toFormat('jpg')
    .toFile(file)
  
  // 5. Return image or error just node style:  (err, (success) => )
  return {
    error,
    image: { public_id, size: image.size, secure_url }
  }
}
