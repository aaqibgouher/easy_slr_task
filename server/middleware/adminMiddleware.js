const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "ADMIN") throw "Only admins are allowed";

    next();
  } catch (error) {
    return res.json({ status: 401, error });
  }
};

module.exports = {
  isAdmin,
};
