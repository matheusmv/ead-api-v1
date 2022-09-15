import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
    const App = express();

    App.use(express.json());

    App.get('/', (req: Request, res: Response) => {
        return res.status(200).send('ok');
    });

    const port = process.env.API_PORT ?? 3001;

    return App.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
});
