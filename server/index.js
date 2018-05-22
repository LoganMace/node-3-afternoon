require('dotenv').config();
const express = require('express'),
      cors = require('cors'),
      { json } = require('body-parser'),
      session = require('express-session'),
      app = express();
      port = process.env.PORT || 3001;
const { checkForSession } = require('./middlewares/checkForSession');
const { read } = require('./controllers/swag_controller');
const { login, register, signout, getUser } = require('./controllers/auth_controller');
const { addItem, deleteItem, checkout } = require('./controllers/cart_controller');
const { search } = require('./controllers/search_controller');


app.use(express.static(`${__dirname}/build`));

app.use(cors());
app.use(json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1223334444
  }
}));
app.use(checkForSession);


app.get('/api/swag', read);

app.post('api/login', login);
app.post('/api/register', register);
app.post('/api/signout', signout);
app.get('/api/user', getUser);

app.post('/api/cart', addItem);
app.post('/api/cart/checkout', checkout);
app.delete('/api/cart', deleteItem);

app.get('/api/search', search);

app.listen(port, () => console.log(`Listening on port: ${port}`));