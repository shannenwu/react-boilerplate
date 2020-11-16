const express = require("express");
const router = express.Router();

const User = require("../models/user");

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

module.exports = router;
