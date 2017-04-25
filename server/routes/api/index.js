const router = require('express').Router();

const userRoutes = require('./user');
const libraryRoutes = require('./library');

router.get('/', (req, res) => {
    res.send('Librarify API');
});

router.use('/user', userRoutes);
router.use('/library', libraryRoutes);

module.exports = router;