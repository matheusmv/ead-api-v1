import { Request, Response } from 'express';
import { roomRepository } from '../repositories/RoomRepository';
import { subjectRepository } from '../repositories/SubjectRepository';
import { videoRepository } from '../repositories/VideoRepository';

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

    async createVideo(req: Request, res: Response) {
        const { title, url } = req.body;
        const { id } = req.params;

        if (!title || !url || !id) {
            return res.status(400).json({
                message: `expected title: string, url: string, id: number`,
            });
        }

        try {
            const room = await roomRepository.findOneBy({ id: Number(id) });

            if (!room) {
                return res
                    .status(404)
                    .json({ message: `room with id ${id} not found` });
            }

            const newVideo = videoRepository.create({ title, url, room });

            await videoRepository.save(newVideo);

            return res.status(201).json(newVideo);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'internal server error' });
        }
    }

    async addSubject(req: Request, res: Response) {
        const { subject_id } = req.body;
        const { id } = req.params;

        if (!subject_id || !id) {
            return res.status(400).json({
                message: `expected subject_id: number, id: number`,
            });
        }

        try {
            const room = await roomRepository.findOneBy({ id: Number(id) });

            if (!room) {
                return res
                    .status(404)
                    .json({ message: `room with id ${id} not found` });
            }

            const subject = await subjectRepository.findOneBy({
                id: Number(subject_id),
            });

            if (!subject) {
                return res
                    .status(404)
                    .json({ message: `subject with id ${id} not found` });
            }

            const updatedRoom = {
                ...room,
                subjects: [subject],
            };

            await roomRepository.save(updatedRoom);

            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'internal server error' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const rooms = await roomRepository.find({
                relations: { subjects: true },
            });

            return res.status(200).json(rooms);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'internal server error' });
        }
    }
}
