require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Errors
const {NodeCourseError} = require('./util/customErrors');

// Controllers
const { authRouter } = require('./controllers/authController');
const { userDataRouter } = require('./controllers/userDataController');
const { usersRouter } = require('./controllers/usersController');
const { gamesRouter } = require('./controllers/gamesController');

// Middleware
const {authMiddleware} = require('./middleware/authMiddleware');

app.use(express.static(__dirname + '/../../dist/lab-js-final-project'));

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.static('./dist'));
app.use(express.json());
app.use(morgan('tiny'));


// Routers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/lab-js-final-project/index.html'));
});
app.use('/api/auth', authRouter);
app.use('/api/users', [authMiddleware], usersRouter);
app.use('/api/users/me', [authMiddleware], userDataRouter);
app.use('/api/games', [authMiddleware], gamesRouter);

app.use((err, req, res, next) => {
  if (err instanceof NodeCourseError) {
    return res.status(err.status).json({message: err.message});
  }
  res.status(500).json({message: err.message});
});

// Start
(async () => {
  try {
    await mongoose.connect(
        'mongodb+srv://yehor:tqn8ggPavnLm6j22@firstcluster.okoyd.mongodb.net/EPAM_NODE?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        },
    );
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Startup server error: ${err}`);
  }
})();
