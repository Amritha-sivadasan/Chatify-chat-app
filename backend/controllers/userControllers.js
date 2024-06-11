const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const getnerateTocken = require("../config/generateToken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  const newUser = new User({
    name,
    email,
    password,
    picture,
  });

  await newUser.save();

  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
      token: getnerateTocken(newUser._id),
    });
  }
});

const authUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const exitUser = await User.findOne({ email });
  console.log("exist user", exitUser);
  if (exitUser && (await exitUser.matchPassword(password))) {
    console.log("password match");

    res.json({
      _id: exitUser._id,
      name: exitUser.name,
      email: exitUser.email,
      picture: exitUser.picture,
      token: getnerateTocken(exitUser._id),
    });
  }
});

const allUsers = expressAsyncHandler(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.json(users);
});

module.exports = { registerUser, authUser, allUsers };
