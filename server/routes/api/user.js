const sha256 = require('sha256');
const jwt = require('jwt-simple');
const moment = require('moment');
const router = require('express').Router();

const User = require('../../models').User;
const config = require('../../config')

router.get('/', (req, res) => {
    res.send('User route');
});

router.post('/', (req, res) => {
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let gender = req.body.gender;
    let password = req.body.password;

    if(!email || !firstName || !lastName || !gender || !password)
        return res.status(400).json({
            code: 0,
            message: 'Fields Missing'
        })

    User.create(req.body)
    .then(u => {
        res.json(u);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            code: 0,
            message: err.errors[0].message
        });
    });
});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password)
        return res.status(401).json({
            code: 0,
            message: 'Fields Missing'
        });

    User.findOne({
        email: email
    }).then(user => {
        if(!user)
            return res.status(401).json({
                code: 0,
                message: 'User not found'
            });

        if(user.password != sha256(password))
            return res.status(401).json({
                code: 0,
                message: 'Wrong Password'
            });

        let token = jwt.encode({
            uid: user.id,
            expires: moment().add('7', 'days')
        }, config.secret);
        
        res.json({
            token: token
        });
    })
})

module.exports = router;
