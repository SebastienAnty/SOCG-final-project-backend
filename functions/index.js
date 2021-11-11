const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const admin = require("firebase-admin");
const creds = require("../credentials.json");

const {createNewUser, getUser, updateUser} = require("./src/users")
const { getAllGames, updateGames, getGamesById } = require("./src/games")

const app = express()
app.use(cors())

app.post("/users", createNewUser)
app.get("/users", getUser)
app.patch("/users", updateUser)

app.get("/games", getAllGames)
app.get("/games", getGamesById)
app.patch("/games", updateGames)



admin.initializeApp({
  credential: admin.credential.cert(creds),
});


exports.app = functions.https.onRequest(app)