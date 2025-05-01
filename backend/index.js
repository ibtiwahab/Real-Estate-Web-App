require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Connect to DB
const connectDB = require('./db/connect');

// Routers
const { router: authRouter } = require('./routes/auth');
const propertyRouter = require('./routes/properties');
const { router: aiRouter } = require('./routes/ai');

// Middleware
const authenticateUser = require('./middleware/authentication');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// File Upload
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
});

// Security
app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet());
app.use(cors());
app.use(xss());

// Body parser
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/ai', aiRouter);

// Error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();