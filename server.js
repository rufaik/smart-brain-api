const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Kems',
    password : '',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());

app.use(cors())

app.get('/', (req, res) => {res.send(database.users) });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { image.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
	console.log('app is running on ${process.env.PORT}');
})

/*
/ --> res = this is working
/signin --> POST = success/fail (goes through as HTTPS thats why its post)
/register --> POST = USER
/profile/:userID --> GET = user
/image --> PUT --> user

WE TEST USING POSTMAN
*/