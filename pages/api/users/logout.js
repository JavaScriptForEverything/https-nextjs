// import '../../../server/models/database'
import nc from 'next-connect'
import * as userController from '../../../server/controllers/userController'
const morgan = require('morgan')

const handler = nc()

handler
	.use(morgan('dev'))
	.post(userController.logout)
