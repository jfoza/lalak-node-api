import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlMigrationFile } from '@/database/infra/typeorm/utils';

export class CreateProductsImagesTable1731086817800
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryUp: string = readSqlMigrationFile(
      '1731086817800-create-products-images-table.sql',
    );

    await queryRunner.query(queryUp);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
