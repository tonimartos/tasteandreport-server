const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'tasteandreport',
    user: 'toni',
    password: 'Martos-12',
});

// const table = pool.query("CREATE TABLE account(\n" +
//     " id serial PRIMARY KEY,\n" +
//     " username VARCHAR (50) UNIQUE NOT NULL,\n" +
//     " password VARCHAR (50) NOT NULL,\n" +
//     " email VARCHAR (355) UNIQUE NOT NULL,\n" +
//     " created_on TIMESTAMP NOT NULL,\n" +
//     " last_login TIMESTAMP\n" +
//     ");", (err, res) => {
//     console.log(err, res);
//     pool.end();
// });

const getUsers = (request, response) => {
    pool.query('SELECT * FROM account;')
        .then((res) => {
            console.log(res.rows);
            response.status(200).json(res.rows);
        })
        .catch(err => console.error('Error executing query', err.stack));
};

const createUser = (request, response) => {
    const { username, email } = request.body;
    console.log(request.body);
    pool.query('INSERT INTO account (username, email) VALUES ($1, $2)', [username, email])
        .then((res) => {
            response.status(201).send(`User added with ID: ${res.insertId}`);
        })
        .catch(err => console.error('Error inserting user', err.stack));
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM account WHERE id = $1', [id])
        .then((res) => {
            response.status(201).send(`User deleted with ID: ${id}`);
        })
        .catch(err => console.error('Error deleting user', err.stack));
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
};