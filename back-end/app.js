const express = require("express");
const app = express();

app.get("/test_server", (req, res) => {
  const test_message = {
    message:
      "Hi, this is the express.js server for subtrackt. If you see this message, it means that the server is running!",
  };

  res.json(test_message);
});

module.exports = app;
