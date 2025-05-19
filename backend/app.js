import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        // credentials: true,
    })
);

app.use(express.json(
    {
        limit: '50mb',
    }
));

app.use(
    express.urlencoded(
        {
            limit: '50mb',
            extended: true,
        }
    )
);

app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/', userRoutes);

export default app;