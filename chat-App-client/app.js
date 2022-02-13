const express = require("express");
const app = express();

const path = require("path");

const port = process.env.PORT || 5000;

// for hosting in heroku
// add(replace) this start script in package.json
// "start": "node app",

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is runnning on port: ", port);
});
