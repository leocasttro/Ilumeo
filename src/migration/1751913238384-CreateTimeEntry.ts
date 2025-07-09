import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTimeEntry1751913238384 implements MigrationInterface {
    name = 'CreateTimeEntry1751913238384'

    public async up(queryRunner: QueryRunner): Promise<void> {
await queryRunner.query(
      `CREATE TABLE "time_entry" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "type" character varying NOT NULL DEFAULT 'entry', CONSTRAINT "PK_8bc1870af1779c749f9026ec508" PRIMARY KEY ("id"))`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "time_entry"`);
    }

}
