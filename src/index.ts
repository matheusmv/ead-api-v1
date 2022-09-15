import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize().then(() => {
    const App = express();

    App.use(express.json());
    App.use(routes);

    const port = process.env.API_PORT ?? 3001;

    return App.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
});
