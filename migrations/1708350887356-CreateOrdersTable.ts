import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOrdersTable1708350887356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists orders (
                id serial primary key,
                date timestamp not null default now(),
                product_id integer not null,
                quantity integer not null,
                price bigint not null,
                merchant_id integer not null,
                consumer_id integer not null,
                constraint fk_product foreign key (product_id) references products(id),
                constraint fk_merchant foreign key (merchant_id) references users(id),
                constraint fk_consumer foreign key (consumer_id) references users(id)
            );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table if exists orders
        `)
  }
}
