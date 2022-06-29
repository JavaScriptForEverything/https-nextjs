import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
  email: String,
  password: String,
  confirmPassword: String
}, {
  timestamps: true
})

export default models.User || model('User', userSchema)