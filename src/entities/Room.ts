import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from './Video';

@Entity('tb_rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @OneToMany(() => Video, (video) => video.room)
    videos: Video[];
}