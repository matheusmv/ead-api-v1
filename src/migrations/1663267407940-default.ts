import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663267407940 implements MigrationInterface {
    name = 'default1663267407940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_subjects" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_49ea4fe678430cbf4a3f23f32b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_room_subject" ("room_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_de35c3924474194d2e63369723f" PRIMARY KEY ("room_id", "subject_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88f5a41e3b10a089ca960c9e4c" ON "tb_room_subject" ("room_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_62bb13284e7c828f5599900a3c" ON "tb_room_subject" ("subject_id") `);
        await queryRunner.query(`ALTER TABLE "tb_room_subject" ADD CONSTRAINT "FK_88f5a41e3b10a089ca960c9e4c8" FOREIGN KEY ("room_id") REFERENCES "tb_subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tb_room_subject" ADD CONSTRAINT "FK_62bb13284e7c828f5599900a3cc" FOREIGN KEY ("subject_id") REFERENCES "tb_rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_room_subject" DROP CONSTRAINT "FK_62bb13284e7c828f5599900a3cc"`);
        await queryRunner.query(`ALTER TABLE "tb_room_subject" DROP CONSTRAINT "FK_88f5a41e3b10a089ca960c9e4c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62bb13284e7c828f5599900a3c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88f5a41e3b10a089ca960c9e4c"`);
        await queryRunner.query(`DROP TABLE "tb_room_subject"`);
        await queryRunner.query(`DROP TABLE "tb_subjects"`);
    }

}
