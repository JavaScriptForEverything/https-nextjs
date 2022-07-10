import { model, models, Schema } from 'mongoose'

const userSchema = new Schema({
  email: String,
  password: String,
  confirmPassword: String,

  avatar: {
  	public_id: String,
  	secure_url: {
  		type: String,
  		required: true
  	},
  	size: Number,
  }
}, {
  timestamps: true
})

export default models.User || model('User', userSchema)
