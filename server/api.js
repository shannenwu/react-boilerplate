/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

//initialize socket
const socket = require("./server-socket");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();
const usersRouter = require("./routes/users");


router.get("/whoami", (req, res) => {
  if (!req.session.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.session.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.session.user)
    socket.addUser(
      req.session.user,
      socket.getSocketFromSocketID(req.body.socketid)
    );
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.use("/users", usersRouter);

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
