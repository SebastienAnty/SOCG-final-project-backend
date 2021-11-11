const { connectDb } = require("./functions/src/db");
const games = require("./games.json");

function uploadGames() {
  const db = connectDb();
  for (const game of games) {
    db.collection("games")
      .doc()
      .set(game)
      .then(() => console.log(`Uploaded game ${game.title}`));
  }
}

uploadGames();
