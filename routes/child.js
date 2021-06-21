const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Child = require("../models/child.model");

//get the token from the header
const getTokenFrom = (req) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
};

//@route GET api/child
//@desc  get child's data stored
//@acess Private
router.route("/").get((req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return req.status(401).json({ error: "token missing or invalid" });
  }

  Child.find()
    .then((child) => res.json(child))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post(async (req, res) => {
  const _id = req.body.id;
  const child = await Child.findOne({ _id });
  const parentReward = req.body.parentReward;
  const childReward = req.body.childReward;

  // gameDate create
  if (child) {
    child.childReward.push(parentReward);
    child.parentReward.push(childReward);
    try {
      await child.save();
    } catch (error) {
      res.json(error);
    }

    return res.json("User already exists");
  }
  const last_name = req.body.last_name;
  const date_of_birth = req.body.dob;

  const newChild = new Child({
    _id,
    last_name,
    date_of_birth,
    parentReward,
    childReward,
  });

  newChild
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Erro" + err));
});

router.route("/:id").get((req, res) => {
  Child.find({ _id: req.params.id })
    .then((childData) => res.json(childData))
    .catch((err) => res.status(400).json("Error" + err));
});


module.exports = router;
