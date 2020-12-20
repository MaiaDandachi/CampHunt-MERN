import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import campRoutes from './routes/campRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use('/api/camps', campRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve(); // Because ES6 modules is used we cant use __dirname like in nodejs

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is runing ...');
  });
}

// Error Handling //
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
