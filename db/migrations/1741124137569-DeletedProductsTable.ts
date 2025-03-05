import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeletedProductsTable1741124137569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "deleted_product" (
        sku VARCHAR PRIMARY KEY,
        deleted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "deleted_product";`);
  }
}
