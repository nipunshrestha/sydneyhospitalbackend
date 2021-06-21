const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Parent = require("../models/parent.model");

//get the token from the header
const getTokenFrom = (req) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
};

//@route GET api/parent
//@desc  get parents's data stored
//@acess Private
router.route("/").get((req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return req.status(401).json({ error: "token missing or invalid" });
  }

  Parent.find()
    .then((parent) => res.json(parent))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post(async (req, res) => {
  const name = req.body.name;
  const patienceID = req.body.id;
  const questions = req.body.question;

  const newUser = new Parent({
    name,
    patienceID,
    questions,
  });

  newUser
    .save()
    .then(() => res.json("Parent added"))
    .catch((err) => res.status(400).json("Erro" + err));
});

router.route("/:id").get((req, res) => {
  Parent.find({ patienceID: req.params.id })
  .then((parentData) => {
    if (parentData.length == 0) {
      console.log(parentData);
      return res.status(400).json("Invalid ID");
    }
    return res.json(parentData);
  })
  .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
