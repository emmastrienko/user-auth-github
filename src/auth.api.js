const express = require("express");
const config = require("../config");
const router = express.Router();
const oauthCtrl = require("./auth.controller");

router.get("/login", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${config.CLIENT_ID}`
  );
});

router.get("/callback", (req, res) => {
  try {
    oauthCtrl.oauthProcessor(req.query.code, (err, data) => {
      if (err) {
        res.status(401).send({ err: "Bad request"});
      } else {
        res.cookie("githubToken", data.access_token, { httpOnly: true });
      }
    });
  } catch (error) {}
});

module.exports = router;
