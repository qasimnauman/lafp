import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: 'json' };

import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.route.js';
import itemRoutes from './routes/item.routes.js'
import commentRoutes from './routes/comments.routes.js';

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
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

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/comments', commentRoutes);

export default app;