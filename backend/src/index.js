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

//create a middleware that populates a user on each request
server.express.use(async (req, res, next) => {
  if (!req.userId) {
    return next();
  }
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{ id, permissions, email, name }"
  );

  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (details) =>
    console.log(
      `Server is now running on port http://localhost:${details.port}`
    )
);
