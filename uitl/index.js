
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
    if(reader.readyState === 2) setValue({ public_url: reader.result, size: file.size })
  }

  return { error, success: true }
}