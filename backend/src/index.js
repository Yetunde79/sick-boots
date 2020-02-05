const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" }); //this has to be at the top of createserver and db.js
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// using express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// using express middleware to populate current user
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //put the req on userId for further requests to access
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details =>
    console.log(
      `Server is now running on port http://localhost:${details.port}`
    )
);
