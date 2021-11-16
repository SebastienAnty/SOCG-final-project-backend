const { connectDb } = require("./db");

exports.createNewChat = (req, res) => {
  const db = connectDb();
  db.collection("users")
    .add(req.body)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => res.status(500).send(err));
};
