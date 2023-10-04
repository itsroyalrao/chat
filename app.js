require("dotenv").config();
const express = require("express");
const http = require("http");
const { join } = require("node:path");
const multer = require("multer");
const cors = require("cors");
const { Server } = require("socket.io");

const connectDB = require("./db/connect");
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");
const homeRoute = require("./routes/home");
const { putObject, getObject } = require("./upload");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("files"), async (req, res) => {
  const file = req.file;
  const formData = req.body;

  try {
    putObject(file.filename, file.mimetype);
    const result = await getObject(`uploads/${file.filename}`);
    res.json({ file, result });
  } catch (error) {
    res.status(500).json({ error: "Error uploading file to S3" });
  }
});

io.on("connection", (socket) => {
  socket.on("join room", (room) => {
    socket.join(room);
  });
  socket.on("user-message", (message, room) => {
    io.to(room).emit("message", message);
  });
  socket.on("media message", (msg, filename, room) => {
    io.to(room).emit("media message", msg, filename);
  });
  socket.on("disconnect", () => {
    console.log("A user is disconnected");
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
