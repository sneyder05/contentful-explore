import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDeletedProductsTable1741195952228 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "deleted_product";`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    // Noop
  }
}
