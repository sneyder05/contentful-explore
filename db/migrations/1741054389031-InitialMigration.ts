import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1741054389031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        sku VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        brand VARCHAR NOT NULL,
        model VARCHAR NOT NULL,
        category VARCHAR NOT NULL,
        price FLOAT NOT NULL,
        currency VARCHAR NOT NULL,
        stock INTEGER NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "product";`);
  }
}
