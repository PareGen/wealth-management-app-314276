import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateReportTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reports',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'portfolio_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'report_data',
            type: 'jsonb',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'reports',
      new TableForeignKey({
        name: 'fk_reports_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'reports',
      new TableForeignKey({
        name: 'fk_reports_portfolio_id',
        columnNames: ['portfolio_id'],
        referencedTableName: 'portfolios',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'reports',
      new TableIndex({
        name: 'idx_reports_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'reports',
      new TableIndex({
        name: 'idx_reports_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'reports',
      new TableIndex({
        name: 'idx_reports_portfolio_id',
        columnNames: ['portfolio_id'],
      })
    );

    await queryRunner.createIndex(
      'reports',
      new TableIndex({
        name: 'idx_reports_portfolio_id',
        columnNames: ['portfolio_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('reports', 'idx_reports_user_id');
    await queryRunner.dropIndex('reports', 'idx_reports_portfolio_id');
    await queryRunner.dropForeignKey('reports', 'fk_reports_user_id');
    await queryRunner.dropForeignKey('reports', 'fk_reports_portfolio_id');
    await queryRunner.dropTable('reports');
  }
}
