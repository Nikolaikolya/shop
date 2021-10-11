require("dotenv").config({
  path: './settings/server.env'
});

const PORT = process.env.PORT || 5050;

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const prisma = require('@prisma/client');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();

// Static
app.use(express.static('public'));
app.use(express.static('public/post_photos'));
app.use(express.static('public/user_photos'));
app.use(express.static('public/category_photos'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));


app.listen(PORT, () => console.log(`Server started from: http://localhost:${PORT}`))