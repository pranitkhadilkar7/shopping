import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsertAdminConsumerMerchantRole1708408920708
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into roles ("name", display_name, description)
            values ('ADMIN', 'Admin', 'This is a admin role');

            insert into roles ("name", display_name, description)
            values ('MERCHANT', 'Merchant', 'This is a merchant role');

            insert into roles ("name", display_name, description)
            values ('CONSUMER', 'Consumer', 'This is a consumer role');
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            delete from roles where name = 'ADMIN';
            delete from roles where name = 'MERCHANT';
            delete from roles where name = 'CONSUMER';
        `)
  }
}
