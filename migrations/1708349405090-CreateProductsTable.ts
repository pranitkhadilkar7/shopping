import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProductsTable1708349405090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists products (
                id serial primary key,
                name varchar(255) not null,
                description varchar(2550) not null,
                model varchar(255) not null,
                model_year varchar(255) not null,
                price bigint not null,
                size varchar(255) not null,
                quantity integer not null,
                created_at timestamp not null default now(),
                updated_at timestamp not null default now(),
                merchant_id integer not null,
                constraint fk_merchant foreign key (merchant_id) references users(id)
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table if exists products 
        `)
  }
}
