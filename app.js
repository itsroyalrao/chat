require("dotenv").config();
const express = require("express");
const { join } = require("node:path");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./db/connect");
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");
const homeRoute = require("./routes/home");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "html", "home", "myGroups.html"));
});

app.use("/auth", authRoute);
app.use("/chat", chatRoute);
app.use("/home", homeRoute);

(async () => {
  await connectDB(process.env.MONGO_URI);
  server.listen(3000, () => {
    console.log("Server is listening on Port:3000");
  });
})();
