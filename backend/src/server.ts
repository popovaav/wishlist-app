import express, { type Application } from 'express'
import cors from 'cors';
import wishlistRoutes from './routes/wishlist.routes.js';

const PORT: number = 8000

const app: Application = express()

app.use(cors());
app.use(express.json());

app.use('/wishlist', wishlistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})