const testMiddleware = (params) => (store) => (next) => (action) => {
	// console.log(params)

	// console.log(action)

	next(action)
}

export default testMiddleware
