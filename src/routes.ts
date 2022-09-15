import { Router } from 'express';
import { RoomController } from './controllers/RoomController';
import { SubjectController } from './controllers/SubjectController';

const routes = Router();

routes.post('/subjects', new SubjectController().create);

routes.post('/rooms', new RoomController().create);

export default routes;
