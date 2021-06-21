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

//GameData Model
let GameData = require("../models/gameData.model");

//@route GET api/gamedata
//@desc  get game data stored
//@acess Private
router.route("/").get(async(req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return req.status(401).json({ error: "token missing or invalid" });
  }

  var game = await GameData.find();
  var screenInfo = {};
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game[i].gameFeedBack.length; j++) {
      if (
        screenInfo[
          game[i].gameFeedBack[j].screenName +
            " " +
            game[i].gameFeedBack[j].feedBack
        ] == null
      ) {
        screenInfo[
          game[i].gameFeedBack[j].screenName +
            " " +
            game[i].gameFeedBack[j].feedBack
        ] = 1;
      } else {
        screenInfo[
          game[i].gameFeedBack[j].screenName +
            " " +
            game[i].gameFeedBack[j].feedBack
        ] =
          screenInfo[
            game[i].gameFeedBack[j].screenName +
              " " +
              game[i].gameFeedBack[j].feedBack
          ] + 1;
      }
    }
  }

  res.json(screenInfo);
});

//@route POST api/gamedata/add
//@desc  Create an preference
//@acess Public

router.route("/add").post(async (req, res) => {
  const body = req.body;

  const feedback = {
    screenName: body.screenName,
    feedBack: body.feedBack,
  };

  const game = await GameData.findOne({ child: body.patienceID });

  if (game === null) {
    const arrFeedback = [feedback];
    const newGameData = new GameData({
      // array of gameFeed back
      gameFeedBack: arrFeedback,
      child: body.patienceID
    });
    newGameData
      .save()
      .then(() => res.json("new Game added"))
      .catch((err) => res.status(400).json("error" + err));
  } else {
    game.gameFeedBack.push(feedback);
    await game.save().catch((err) => res.status(400).json("error" + err));
    console.log(game);
    res.json("game data added");
  }
});

//@route GET api/gamedata/:id
//@desc  Find an gamedata by patienceID
//@acess Public
router.route("/:id").get(async(req, res) => {
  var singleData = await GameData.findOne({ child: req.params.id });
  var screenInfo = {};
  for (let j = 0; j < singleData.gameFeedBack.length; j++) {
    if (
      screenInfo[
        singleData.gameFeedBack[j].screenName +
          " " +
          singleData.gameFeedBack[j].feedBack
      ] == null
    ) {
      screenInfo[
        singleData.gameFeedBack[j].screenName +
          " " +
          singleData.gameFeedBack[j].feedBack
      ] = 1;
    } else {
      screenInfo[
        singleData.gameFeedBack[j].screenName +
          " " +
          singleData.gameFeedBack[j].feedBack
      ] =
        screenInfo[
          singleData.gameFeedBack[j].screenName +
            " " +
            singleData.gameFeedBack[j].feedBack
        ] + 1;
    }
  }
  res.json(screenInfo);
});

module.exports = router;
