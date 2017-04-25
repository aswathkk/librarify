const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config');
const models = require('./models');
const routes = require('./routes');

const app = express();

const port = config.port;

models.sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    .then((results) => {
        models.sequelize.sync({
            force: true
        })
        .catch(err => console.log(err));
    });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, '../dist')));

app.use(routes);

app.listen(port, () => {
    console.log(`Server is Listening @ http://localhost:${port}`);
});
