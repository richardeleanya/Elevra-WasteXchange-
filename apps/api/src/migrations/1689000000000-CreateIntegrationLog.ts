import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIntegrationLog1689000000000 implements MigrationInterface {
    name = 'CreateIntegrationLog1689000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "integration_log" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "userId" varchar NOT NULL,
                "provider" varchar NOT NULL,
                "status" varchar NOT NULL,
                "payload" jsonb NOT NULL,
                "receivedAt" TIMESTAMP DEFAULT now()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "integration_log"`);
    }
}