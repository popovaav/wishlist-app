import express, { type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import wishlistRoutes from './routes/wishlist.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: 'Too many requests, please try again later.',
  },
});

const PORT = Number(process.env.PORT) || 8000;

const app: Application = express()

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/wishlist', limiter, wishlistRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})