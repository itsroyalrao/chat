console.clear();

require("dotenv").config();
const express = require("express");
const { join } = require("node:path");
const cors = require("cors");

const connectDB = require("./db/connect");
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");
const homeRoute = require("./routes/home");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "html", "home", "myGroups.html"));
});

app.use("/auth", authRoute);
app.use("/chat", chatRoute);
app.use("/home", homeRoute);

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(3000, () =>
    console.log("APP is listening at http://localhost:3000")
  );
})();
