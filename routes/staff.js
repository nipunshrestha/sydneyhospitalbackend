const router = require("express").Router();
const bcryt = require("bcrypt");

//User Model
let Staff = require("../models/staff.model");

//@route GET api/users
//@desc  Register new user
//@acess Public
router.route("/").get((req, res) => {
  Staff.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post(async (req, res) => {
  const _id = req.body._id;
  const userEmail = req.body.userEmail;
  const password = await bcryt.hash(req.body.password, 10);

  const newUser = new Staff({
    _id,
    userEmail,
    password,
  });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Erro" + err));
});

module.exports = router;
