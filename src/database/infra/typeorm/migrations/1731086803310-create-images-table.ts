import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlMigrationFile } from '@/database/infra/typeorm/utils';

export class CreateImagesTable1731086803310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queryUp: string = readSqlMigrationFile(
      '1731086803310-create-images-table.sql',
    );

    await queryRunner.query(queryUp);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
