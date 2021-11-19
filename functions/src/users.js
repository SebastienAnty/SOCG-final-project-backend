const { connectDb } = require("./db");

exports.createNewUser = (req, res) => {
  if (
    !req.body.fname ||
    !req.body.lname ||
    !req.body.email ||
    !req.body.onlineid
  ) {
    res.status(401).send({ message: "Invalid Request" });
    return;
  }
  const db = connectDb();
  db.collection("users")
    .add(req.body)
    .then((docRef) => res.status(201).send({ id: docRef.id }))
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.updateUser = (req, res) => {
  const db = connectDb();
  let user = req.body;
  const { id } = req.params;
  db.collection("users")
    .doc(id)
    .update(user)
    .then(() => this.getUserById(req, res))
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getUserById = (req, res) => {
  const { userId } = req.params;
  const db = connectDb();
  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      let user = doc.data();
      user.id = doc.id;
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getAllUsers = (req, res) => {
  const db = connectDb();
  db.collection("users")
    .get()
    .then((collection) => {
      const users = collection.docs.map((doc) => {
        let user = doc.data();
        user.id = doc.id;
        return user;
      });
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
