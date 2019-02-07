const express = require('express');
const bodyParser = require('body-parser');
const postgres = require('./queries');

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.route('/').get((req, res) => res.json({ info: 'Node.js, Express, and Postgres API' }));

app.route('/accounts').get(postgres.getUsers);
app.route('/accounts').post(postgres.createUser);
app.route('/accounts/:id').delete(postgres.deleteUser);

app.listen(3000, () => {
    console.log('Server started!');
});