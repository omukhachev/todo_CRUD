const express = require('express');
const bodyParser = require('body-parser');
const user = require('./db/routes/user.route');
const item = require('./db/routes/item.route');
const script = require('./db/routes/scripts.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.use(cors());

const mongoose = require('mongoose');
const remote_db_url = 'mongodb+srv://user:restart987@cluster0.ql2ol.mongodb.net/database?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || remote_db_url;

mongoose.connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;

db.on('error', console.error.bind(console.error, 'MongoDB connection error:'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', user);
app.use('/items', item);
app.use('/scripts', script);
app.use(cookieParser('secret key'));


const port = 1122;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});