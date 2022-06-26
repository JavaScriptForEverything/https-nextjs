import nc from 'next-connect'
const morgan = require('morgan')
import * as userController from '../../../server/controllers/userController'

const router = nc()

router
  .use(morgan('dev'))
  .post( userController.login )

export default router