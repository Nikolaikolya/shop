require("dotenv").config({
  path: './settings/server.env'
});

const PORT = process.env.PORT || 5050;

const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Import routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const loadFile = require('./routes/load');
const regions = require('./routes/region');

const app = express();

// Middleware
const authMeddleware = require('./middleware/auth');
const adminMeddleware = require('./middleware/admin');

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

// Routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/load', loadFile);
app.use('/api/v1/info', regions);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({ success: true }));


app.listen(PORT, () => console.log(`Server started from: http://localhost:${PORT}`));