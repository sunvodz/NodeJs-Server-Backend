const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const db = require('./config/keys').mongoURI

mongoose
.connect(db)
.then(() => console.log('MongoDB Connet'))
.catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.get('/',(req,rea) => rea.send('Hello'));


app.use('/api/user',user);
app.use('/api/profile',profile);
app.use('/api/posts',posts);


const port = process.env.PORT || 8080;

app.listen(port,() => console.log(`Run Port : ${port}`));