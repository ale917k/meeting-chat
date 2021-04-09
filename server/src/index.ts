import express from "express";
import cors, { CorsOptions } from "cors";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import morgan from "morgan";
import "module-alias/register";
import { addUser, removeUser, getUser, getUsersInRoom } from "server/controllers/users";

// App configuration
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 8080;
const baseURL = process.env.NODE_ENV === "development" ? "/api" : "";

// Cors midddleware options
const whitelist = ["http://localhost:3000", "http://localhost:8080"];
const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("combined"));

// app.use((_, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Socket connection
io.on("connect", (socket: Socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.` });
    socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: "Admin", text: `${user.name} has left.` });
      io.to(user.room).emit("roomData", { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

app.get(`${baseURL}/`, (_, res) => {
  res.status(201).send(`Server successfully connected on port ${port}`);
});

server.listen(port, () => {
  console.log(`Server is up and running on ${process.env.NODE_ENV} - port ${port}`);
});
