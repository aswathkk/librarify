const router = require('express').Router();

const Library = require('../../models').Library;
const auth = require('../../auth');

router.get('/', auth, (req, res) => {
    Library.findAll()
    .then(lib => {
        res.json(lib);
    })
});

router.post('/', auth, (req, res) => {
    const user = req.body.user;
    Library.create(req.body)
    .then(lib => {
        lib.setCreator(user).then(lib => res.json(lib))
        .catch(err => {
            res.status(400).json({
                code: 0,
                message: err
            });
        });
    })
    .catch(err => {
        res.status(400).json({
            code: 0,
            message: err
        });
    });
});

router.delete('/:id', auth, (req, res) => {
    let user = req.body.user;
    Library.findById(req.params.id)
    .then(lib => {
        if(lib.creatorId === user.id)
            lib.destroy()
            .then(() => res.json({ message: 'Library Deleted!' }));
        else
            res.status(400).json({ code: 0, message: 'You are not autherized to delete this library' });
    })
    .catch(err => res.status(400).json({ code: 0, message: err }));
});

module.exports = router;
