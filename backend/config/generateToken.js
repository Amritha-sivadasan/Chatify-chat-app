const jwt = require("jsonwebtoken");

const getnerateTocken = (id) => {
  console.log("id", id);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = getnerateTocken;
