import { isEmail } from 'validator'

/* 	export const signUpUser = (data) => catchAsyncDispatch( async (dispatch) => {
		  dispatch(actions.requested())
		  const { data: { user } } = await axios.post('/api/users', data)
		  dispatch(actions.signUpUser(user))
		}, actions.failed) */
export const catchAsyncDispatch = (fn, showError) => (dispatch, getStore) => {
	return fn(dispatch, getStore).catch(err => {
		const message = err.response?.data.message || err.message
		dispatch( showError(message) )
	})
}



/* 	const { error } = readAsDataURL(file, setAvatar, { pdf: true })
		const { error } = readAsDataURL(file, setAvatar, { pdf: false })
		const { error } = readAsDataURL(file, setAvatar) */ 
export const readAsDataURL = (file, setValue=f=>f, {pdf = false}={} ) => {
  let error = ''

  const isImage = file.type.match('image/(jpeg|png)')?.[1]
  if(!pdf) error = !isImage ? 'Only "jpg/jpeg" or "png" image allowed' : ''
  
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    if(reader.readyState === 2) setValue({ secure_url: reader.result, size: file.size })
  }

  return { error, success: true }
}



/* 	const submitHandler = (evt) => {
			evt.preventDefault()

			if( !formValidator(fields, setFieldsError)) return 

			console.log(fields)
			// dispatch(loginUser(fields))
		} */
export const formValidator = (fields, setFieldsError) => {
  const { email, password, confirmPassword } = fields || {}
  const tempObj = {}

  if( email && !isEmail(email) ) tempObj.email = `(${email}) is invalid email address`
  if(confirmPassword && confirmPassword !== password) tempObj.confirmPassword = 'password and confirmPassword not matched'
  if(password?.length < 4) tempObj.password = 'password field must be atleast 4 charecter long'
  

  Object.keys(fields).forEach(field => {
    if( !fields?.[field].trim() ) tempObj[field] = `${field} field is empty`
  })
  
  setFieldsError(tempObj)
  return Object.keys(tempObj).every(field => field === '')
}
