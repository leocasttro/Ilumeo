import express from 'express';
import { initializeDatabase } from './config/database';
import routes from './routes';
import cors from 'cors'; 

const app = express();
const PORT = process.env.APP_PORT || 3001;

const allowedOrigins = [
  'http://localhost:3000',
  'https://ilumeo-frontend-orcin.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log('Origem da requisição:', origin); // Log para depuração
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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