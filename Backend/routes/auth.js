const routes = require('express').Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');

routes.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(404).json({ Err: "Please add all the fields" });
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ Err: "Invalid Email" });
            }
            if (user.password !== password) {
                return res.status(404).json({ Err: "Invalid Password" });
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.send({ token });
        })
        .catch(err => console.log(err));
})

routes.post('/signup', (req, res) => {
    const { name, email, title, avatar, usertype, password } = req.body;
    if (!name || !email || !title || !avatar || !usertype || !password) {
        return res.status(404).json({ Err: "Please add all the fields" });
    }
    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.status(404).json({ Err: "Email Already taken" });
            }
            const newuser = new User({
                name: name,
                email: email,
                title: title,
                avatar: avatar,
                usertype: usertype,
                password: password
            });
            newuser.save()
                .then((user) => {
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    res.send({ token, user });
                })
                .catch(err => console.log(err));
        })
})

module.exports = routes;