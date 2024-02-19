import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateConsumersMerchantsTable1708342805863
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists consumers_merchants (
                consumer_id integer not null,
                merchant_id integer not null,
                constraint fk_consumer foreign key (consumer_id) references users(id),
                constraint fk_merchant foreign key (merchant_id) references users(id)
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        drop table if exists consumers_merchants
    `)
  }
}
