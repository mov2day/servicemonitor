import express from 'express';
import cors from 'cors';
import { config } from './config';
import { healthRoutes } from './routes/health';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', healthRoutes);

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});