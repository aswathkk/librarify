const router = require('express').Router();

const userRoutes = require('./user');

router.get('/', (req, res) => {
    res.send('Librarify API');
});

router.use('/user', userRoutes);

module.exports = router;