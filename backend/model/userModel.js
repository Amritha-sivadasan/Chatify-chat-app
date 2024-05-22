const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,

      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSzhiQWKfmkIEgC4nK9ShYjiWz6-DJgxeNyMoBLLabBo1e5kzMq_TE9_rFzSJpPow264&usqp=CAU",
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
