const express = require("express");
const jwt = require("jsonwebtoken");
const usersBLL = require("../BLL/usersBLL");
require('dotenv').config({path:".env"})

const router = express.Router();

router.route("/").post(async (req, res) => {
  const { username, email } = req.body;
  const userData = await usersBLL.getUser(username, email);
  const userId = userData.id
  if (userId != "error") {
    const accessToken = jwt.sign(
      { id: userId },
      process.env.SECRET_KEY,
      
    );
    const result = {
      accessToken:accessToken,
      name:userData.name,
      id:userData.id,
      actions:userData.actions
    }
    res.json(result);
  } else res.status(401).send("error"); // Unauthorized

  
});

module.exports = router;
