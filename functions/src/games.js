const {connectDb} = require("./db")


exports.getAllGames = (req, res) => {
    const db = connectDb()
    db.collection("games").get()
    .then(collection => {
        const games = collection.docs.map(doc => {
            let games = doc.data()
            games.id= doc.id
            return games
        })
        res.send(games)
    })
    .catch(err => res.status(500).send(err))
}

exports.updateGames = (req, res) => {
    const { gameId } = req.params
    const db = connectDb()
    db.collection("games").doc(gameId).update(req.body)
    .then(() => res.status(202).send({ message: "updated"})) 
    .catch(err=> res.status(500).send(err))
}

exports.getGamesById = (req, res) => {
    const db = connectDb()
    const { gameId} = req.params
    db.collection("games").doc(gameId).get()
    .then( doc => {
        let game = doc.data
        game.id = doc.id
        res.send(game)
    })
    .catch(err=> res.status(500).send(err))
}