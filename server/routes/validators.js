const express = require("express");

// ------------------------------ AUTH

const ensureUserNotLoggedIn = function (req, res, next) {
  if (req.session.uid) {
    res.status(400).json({ error: "You are already signed in!" }).end();
    return;
  }
  next();
};

const ensureUserLoggedIn = function (req, res, next) {
  if (!req.session.uid) {
    res.status(401).json({ error: "Must be signed in!" }).end();
    return;
  }
  next();
};

// ------------------------------ BODY

const ensureValidUsernameInBody = function (req, res, next) {
  if (!req.body.username || !req.body.username.trim()) {
    res
      .status(400)
      .json({ error: "You must specify a valid username in the body" })
      .end();
    return;
  }
  next();
};

const ensureValidPasswordInBody = function (req, res, next) {
  if (!req.body.password || !req.body.password.trim()) {
    res
      .status(400)
      .json({ error: "You must specify a valid username in the body" })
      .end();
    return;
  }
  next();
};

module.exports = {
  ensureUserNotLoggedIn,
  ensureUserLoggedIn,
  ensureValidUsernameInBody,
  ensureValidPasswordInBody,
};
