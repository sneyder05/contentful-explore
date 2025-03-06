import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtToProduct1741196598194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD COLUMN deleted_at TIMESTAMP(3);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN deleted_at;`);
  }
}
