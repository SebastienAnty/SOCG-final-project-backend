const {connectDb} = require("./db")

exports.createNewUser = (req, res) => {
    if(!req.body.fname || !req.body.lname || req.body.email || req.body.onlineid) {
        res.status(401).send({message: "Invalid Request"})
        return
    }
    const db = connectDb()
    db.collection("user").add(req.body)
    .then(docRef => res.status(201).send({ id: docRef.id}))
    .catch(err => res.status(500).send(err))
}

exports.updateUser = (req, res) => {
    const db = connectDb()
    const { userId } = req.params
    db.collection("user").doc(userId).update(req.body)
    .then(() => res.status(202).send({ message: "updated"}))
    .catch(err => res.status(500).send(err))
}

exports.getUser = (req, res) => {
    const db = connectDb()
    const { userId } = req.params
    db.collection("user").doc(userId).get()
    .then(doc => {
        let user = doc.data()
        user.id = doc.id
        res.send(user)
    })
    .catch(err => res.status(500).send(err))
}