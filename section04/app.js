const path = require('path');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f4c40755b13aab42d279c7')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.MONGODB_URL)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Darcee',
          email: 'darcee@test.com',
          cart:{
            items:[]
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
