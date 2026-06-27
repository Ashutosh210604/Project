const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

/**
 * -Routes Required
 */
const authRouter = require('./Routers/auth.routes')

app.use('/api/auth', authRouter);


module.exports = app;
