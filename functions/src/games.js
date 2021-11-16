const { connectDb } = require("./db");

exports.getGames = (req, res) => {
  const db = connectDb();
  db.collection("games")
    .get()
    .then((collection) => {
      const games = collection.docs.map((doc) => {
        let game = doc.data();
        game.id = doc.id;
        return game;
      });
      res.send(games);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
