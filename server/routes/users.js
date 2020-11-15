const express = require("express");
const router = express.Router();

const Users = require("../models/Users");

const v = require("./validators");

/**
 * Get user corresponding to id.
 * @name GET/api/users/:id
 * @param {string} id of user being looked up
 * @throws {400} if no user id provided
 * @throws {404} if no user exists
 */
router.get("/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({
      error: "No user id provided.",
    });
  }
  const user = Users.findOneById(req.params.id);
  if (user) {
    return res.status(200).json({ username: user.username, id: user.id });
  } else {
    return res.status(404).json({
      error: `No user exists with id ${req.params.id}`,
    });
  }
});

/**
 * Set username of active user.
 * @name POST/api/users/signin
 * @param {string} username
 * @param {string} password
 * @throws {400} if user already signed in, or no user exists
 * @throws {403} if password for username is incorrect
 */
router.post("/signin", [v.ensureUserNotLoggedIn], (req, res) => {
  if (!req.body.username) {
    return res
      .status(400)
      .json({ error: "The user name must be at least 1 character." });
  }

  if (!req.body.password) {
    return res.status(400).json({ error: "Password cannot be empty." });
  }

  const user = Users.findOneByUsername(req.body.username);
  if (!user) {
    return res.status(400).json({
      error: `Username ${req.body.username} does not exist.`,
    });
  }

  if (user.password !== req.body.password) {
    return res.status(403).json({
      error: "Incorrect password.",
    });
  } else {
    req.session.uid = user.id;
    return res
      .status(200)
      .json(user);
  }
});

/**
 * Signs out active user.
 * @name POST/api/users/signout
 */
router.post("/signout", (req, res) => {
  if (req.session.uid) {
    req.session.destroy();
    return res.status(200).json({ message: "Successfully signed out." });
  } else {
    return res.status(400).json({ message: "No user is signed in." });
  }
});

/**
 * Create a new user.
 * @name POST/api/users
 * @param {string} username - Unique user name
 * @param {string} password - User password
 * @return {User | undefined} - created user
 * @throws {400} if already signed in, username already exists, or invalid username
 */
router.post("/", (req, res) => {
  if (req.session.uid) {
    return res.status(400).json({
      error: "You can't create another account since you're already signed in.",
    });
  }

  if (!req.body.username) {
    return res
      .status(400)
      .json({ error: "Username must be at least 1 character." });
  }

  if (!req.body.password) {
    return res
      .status(400)
      .json({ error: "Password must be at least 1 character." });
  }

  const newUser = Users.addOne(req.body.username, req.body.password);
  if (newUser) {
    req.session.uid = newUser.id;
    return res.status(200).json(newUser);
  } else {
    return res.status(400).json({
      error: `Username ${req.body.username} already exists.`,
    });
  }
});

/**
 * Update a username.
 * @name PATCH/api/users/username
 * @param {string} username - the new username for this user
 * @return {User} - the updated user
 * @throws {403} - if no user is logged in
 * @throws {400} - if new username is an empty string or if new username is already taken
 */
router.patch("/username", (req, res) => {
  if (!req.session.uid) {
    return res.status(403).json({
      error: "You must be logged in in order to change your username!",
    });
  }
  if (!req.body.username) {
    return res
      .status(400)
      .json({ message: "The new username must be at least 1 character." });
  }

  const oldUser = Users.findOneById(req.session.uid);
  if (oldUser.username === req.body.username) {
    return res
      .status(304)
      .json({ message: "New username is same as your current username." });
  }

  const existingUser = Users.findOneByUsername(req.body.username);
  if (existingUser) {
    return res.status(400).json({
      message: "This new username is already taken! Please choose another one.",
    });
  }

  const updatedUser = Users.updateOneUsername(
    req.session.uid,
    req.body.username
  );

  if (!updatedUser) {
    return res.status(500).json({
      message: "We can't find this user. Please try again.",
    });
  }

  return res
    .status(200)
    .json(updatedUser);
});

/**
 * Update a password for a user.
 * @name PATCH/api/users/password
 * @param {string} password - the new username for this user
 * @return {User} - the updated user
 * @throws {403} - if no user is logged in
 * @throws {500} - if the user can't be found
 */
router.patch("/password", (req, res) => {
  if (!req.session.uid) {
    return res.status(403).json({
      error: "You must be logged in in order to change your password!",
    });
  }
  if (!req.body.password.length) {
    return res
      .status(400)
      .json({ message: "The password must be at least 1 character." });
  }

  const updatedUser = Users.updateOnePassword(
    req.session.uid,
    req.body.password
  );
  if (!updatedUser) {
    return res.status(500).json({
      message: "We can't find this user. Please try again.",
    });
  } else {
    return res
      .status(200)
      .json(updatedUser);
  }
});

/**
 * Delete a user.
 * @name DELETE/api/users
 * @param {string} username - username of User to delete
 * @return {User | undefined} - deleted User
 */
router.delete("/", (req, res) => {
  if (!req.session.uid) {
    return res.status(403).json({
      error: "You must be logged in in order to delete your account!",
    });
  }

  const user = Users.deleteOne(req.session.uid);

  req.session.destroy();
  return res
    .status(200)
    .json({ message: `User ${user.username} deleted.` });
});

module.exports = router;
