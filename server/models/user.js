const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" }
})

UserSchema.pre("save", function(next) {
  const user = this
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err)
      }

      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err)
        }

        user.password = hash
        next()
      })
    })
  }
})

UserSchema.methods.comparePassword = function (password, next) {
  const user = this
  return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model("User", UserSchema)