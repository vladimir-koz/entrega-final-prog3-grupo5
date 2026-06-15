import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        message: 'Backend running',
    });
});

app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
    status: 'ok',
    message: 'API running',
    });
});

export default app;
