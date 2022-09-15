import { Request, Response } from 'express';
import { roomRepository } from '../repositories/RoomRepository';

export class RoomController {
    async create(req: Request, res: Response) {
        const { name } = req.body;

        if (!name) {
            return res
                .status(400)
                .json({ message: 'name must not be empty/null' });
        }

        try {
            const newRoom = roomRepository.create({ name });

            await roomRepository.save(newRoom);

            return res.status(201).json(newRoom);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'internal server error' });
        }
    }
}
