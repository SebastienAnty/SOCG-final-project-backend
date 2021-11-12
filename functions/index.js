const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const creds = require("./credentials.json");

const { createNewUser, updateUser, getUserById } = require("./src/users");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users", createNewUser);
app.patch("/users/:id", updateUser);
app.get("/users/:id", getUserById);

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

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// exports.app = functions.https.onRequest(app);
