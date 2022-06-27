import nc from 'next-connect'
const morgan = require('morgan')
import * as userController from '../../../server/controllers/userController'
import { onError } from '../../../server/util'

const router = nc({ onError })

router
  .use(morgan('dev'))
  .post( userController.signup )

export default router