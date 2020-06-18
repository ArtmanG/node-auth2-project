const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
    const department = {department: req.decodedToken.department}
    Users.findBy(department)
    .then(users => {
        res.status(200).json({users})
    })
    .catch(error => res.send(error));
});

module.exports = router;