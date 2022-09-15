import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663266270984 implements MigrationInterface {
    name = 'default1663266270984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_videos" ("id" SERIAL NOT NULL, "title" text NOT NULL, "url" text NOT NULL, "room_id" integer, CONSTRAINT "PK_6299adb8a1be0b9d0f4cc66d894" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_rooms" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_55bf0113589c99e2ec72ebec129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_videos" ADD CONSTRAINT "FK_45786c8107ff7d25984366bd03d" FOREIGN KEY ("room_id") REFERENCES "tb_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_videos" DROP CONSTRAINT "FK_45786c8107ff7d25984366bd03d"`);
        await queryRunner.query(`DROP TABLE "tb_rooms"`);
        await queryRunner.query(`DROP TABLE "tb_videos"`);
    }

}
