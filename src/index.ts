import express from 'express';
import { initializeDatabase } from './config/database';
import routes from './routes';
import cors from 'cors'; 

const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();