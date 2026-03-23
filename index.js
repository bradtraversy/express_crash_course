const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

// importing middleware and utils for error handling
const errorHandler = require('./middleware/errorHandler');
const asyncHandler = require('./middleware/asyncHandler');
const AppError = require('./utils/AppError');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route (wrapped with asyncHandler)
app.get('/', asyncHandler(async (req, res, next) => {
  if (!members) {
    throw new AppError('Members data not found', 404);
  }

  res.render('index', {
    title: 'Member App',
    members
  });
}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/members'));


// Handle Unknown Routes (404)
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handling Middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));