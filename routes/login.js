const jwt = require("jsonwebtoken");
const bcryt = require("bcrypt");
const loginRouter = require("express").Router();
const Staff = require("../models/staff.model");

loginRouter.post("/", async (req, res) => {
  const body = req.body;
  const staff = await Staff.findOne({ userEmail: body.userEmail });
  const passwordCorrect =
    staff === null ? false : await bcryt.compare(body.password, staff.password);

  if (!(staff && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    userEmail: staff.userEmail,
    id: staff._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    userEmail: staff.userEmail,
  });
});

module.exports = loginRouter;
