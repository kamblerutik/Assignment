const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).json("Hello from Home");
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRegistered = await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "User created successfully", userRegistered });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await userModel.findOne({ username });

    if (!userExists) {
      return res.status(400).json({ msg: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(password, userExists.password);

    if (isMatch) {
      res.status(200).json({ msg: "User logged in successfully" });
    } else {
      return res.status(400).json({ msg: "Invalid password" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
    const user = await userModel.findById(id).select("+password");
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!user || !isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid current password or User not found" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, Register, Login, updatePassword };
