const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const noteRouter = require('./Routes/noteRouter');
const userRouter = require('./Routes/userRouter');
const { globalErrorHandler } = require('./Controllers/errorController');
const AppError = require('./Utils/appError');

const app = express();

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('Public'));
app.use(compression());
app.use('/api/v1/note', noteRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
