const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "thisismyboy";

//Route 1:  Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "enter a valide password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //if there are error, return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check whether the user with the email exists already
      let user = await Users.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with the email Already exist" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a user
      user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // })
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//Route 2: authenticate a user using: POST "/api/auth/login". no login required
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please tye to login with the correct creadentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please tye to login with the correct creadentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Get User Details using: POTH "/api/auth/getuser". Login Required

router.post("/getusr", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
