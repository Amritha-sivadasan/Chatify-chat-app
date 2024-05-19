const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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

const User = mongoose.model("User", userSchema);
module.exports = User;
