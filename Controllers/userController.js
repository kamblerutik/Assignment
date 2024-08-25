const userModel = require("../Models/userModel");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel
      .findById(id)
      .select("-password -__v -updatedAt -createdAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser };
