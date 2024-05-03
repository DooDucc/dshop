const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const sendEmail = require("../utils/sendEmail");

const register = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      const newUser = await User.create(req.body);
      res.json({
        _id: newUser?._id,
        firstName: newUser?.firstName,
        lastName: newUser?.lastName,
        email: newUser?.email,
        phone: newUser?.phone,
        token: generateToken(newUser?._id),
      });
    } else {
      throw new Error("User Already Exists");
    }
  } catch (error) {
    throw new Error("Failed to register");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
      if (findUser?.isBlocked) {
        throw new Error("You are blocked");
      }
      res.json({
        _id: findUser?._id,
        firstName: findUser?.firstName,
        lastName: findUser?.lastName,
        email: findUser?.email,
        phone: findUser?.phone,
        token: generateToken(findUser?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error("Failed to login");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDbId(_id);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        phone: req?.body?.phone,
        role: req?.body?.role,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const deleteaUser = await User.findByIdAndDelete(id);
    res.json(deleteaUser);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const blockuser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockuser);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");

    const token = await user.createPasswordResetToken();
    await user.save();
    const html = `Hi, Please follow this link to reset your Password. This link is valid till 10 minutes from now. <a style="color: blue; text-decoration: underline" href='${process.env.FE_URL}/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: `Hey ${user.lastName} ${user.firstName}`,
      subject: "Forgot Password Link",
      html,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getFavProducts = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;

    const findUser = await User.findById(_id).populate("favProducts");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  register,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  forgotPasswordToken,
  resetPassword,
  getFavProducts,
};
