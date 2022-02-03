const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const creds = require("./credentials.json");

const {
  createNewUser,
  updateUser,
  getUserById,
  getAllUsers,
} = require("./src/users");

const { getGames } = require("./src/games");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/rest/users/:userId", getUserById);
app.get("/rest/users", getAllUsers);
app.post("/rest/newusers", createNewUser);
app.patch("/rest/users/:userId", updateUser);

app.get("/rest/games", getGames);

admin.initializeApp({
  credential: admin.credential.cert(creds),
});

const withAuthorization = async (req, res, next) => {
  const jwt = req.headers.authorization;
  try {
    const id = await admin.auth().verifyIdToken(jwt);
    res.locals.userId = id.uid;
  } catch {
    res.status(403).send("Unauthorized");
    return;
  }
  next();
};

app.get("/authenticated", withAuthorization, (req, res) => {
  return res.send({ your: "cool" }).status(200);
});

exports.app = functions.https.onRequest(app);
