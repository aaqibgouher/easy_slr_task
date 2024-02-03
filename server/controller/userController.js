const userService = require("../service/userService");

// register
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const data = await userService.register({ name, email, password, role });

    return res.json({ status: 200, message: "Successfully registered", data });
  } catch (error) {
    console.log(error, "from register method controller");
    return res.json({ status: 400, error });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await userService.login({ email, password });

    return res.json({ status: 200, message: "Successfully login", data });
  } catch (error) {
    console.log(error, "from login method controller");
    return res.json({ status: 400, error });
  }
};

// get me
const getMe = async (req, res) => {
  try {
    const data = req.user;

    return res.json({ status: 200, message: "Successfully get me", data });
  } catch (error) {
    console.log(error, "from get me method controller");
    return res.json({ status: 400, error });
  }
};

// logout
const logout = async (req, res) => {
  try {
    // calling service
    const data = await userService.logout({
      userId: req.user._id,
      token: req.token,
    });

    // returning res
    return res.json({
      status: 200,
      message: "Successfully logout",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from logout controller");
    return res.json({ status: 400, error });
  }
};

const addUser = async (req, res) => {
  try {
    // calling service
    const { name, email } = req.body;
    const { _id } = req.user;
    const data = await userService.addUser({ createdBy: _id, name, email });

    // returning res
    return res.json({
      status: 200,
      message: "Successfully added user",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from add user controller");
    return res.json({ status: 400, error });
  }
};

const getUsers = async (req, res) => {
  try {
    // calling service
    const { _id } = req.user;
    const data = await userService.getUsers({ userId: _id });

    // returning res
    return res.json({
      status: 200,
      message: "Successfully get users",
      data,
    });
  } catch (error) {
    // returning error
    console.log(error, "from get users controller");
    return res.json({ status: 400, error });
  }
};

const updateProfile = async (req, res) => {
  try {
    // calling service
    const { _id } = req.user;
    const { name } = req.body;
    const data = await userService.updateProfile({ userId: _id, name });

    // returning res
    return res.json({
      status: 200,
      message: "Successfully updated user profile",
      data,
    });
  } catch (error) {
    return res.json({ status: 400, error });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  addUser,
  getUsers,
  updateProfile,
};
