import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1708089542436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists users (
            id serial primary key,
            username varchar(255) unique not null,
            email varchar(255) unique not null,
            password varchar(255) not null,
            phoneno varchar(10) not null,
            created_at timestamp not null default now(),
            updated_at timestamp not null default now()
        )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table if exists users`)
  }
}
