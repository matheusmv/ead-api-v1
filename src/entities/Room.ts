import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Subject } from './Subjects';
import { Video } from './Video';

@Entity('tb_rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @OneToMany(() => Video, (video) => video.room)
    videos: Video[];

    @ManyToMany(() => Subject, (subject) => subject.rooms)
    subjects: Subject[];
}
