const mongoose = require ("mongoose");
// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// userSchema.statics.findById = async function (login) {
//   let user = await this.findOne({
//     username: login,
//   });
 
//   if (!user) {
//     user = await this.findOne({ email: login });
//   }
 
//   return user;
// };
const getUser = function () {
	const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);
	userSchema.statics.findById = async function (login) {
  let user = await this.findOne({
    username: login,
  });
 
  if (!user) {
    user = await this.findOne({ email: login });
  }
};
return userSchema;
}
 
// const User = mongoose.model('User', userSchema);
 
module.exports = {getUser};