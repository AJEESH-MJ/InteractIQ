const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, phoneNumber, password } = req.body;

  if (!name || !phoneNumber || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ phoneNumber });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    phoneNumber,
    password,
    // avatar:
    //   "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      // avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  const user = await User.findOne({ phoneNumber });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phoneNumber: user.phoneNumber,
      // avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid phone Number or password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { phoneNumber: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.json(users);
});

module.exports = { registerUser, authUser, allUsers };
