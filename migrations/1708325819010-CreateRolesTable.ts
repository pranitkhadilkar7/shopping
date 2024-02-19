import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRolesTable1708325819010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists roles (
                id serial primary key,
                name varchar(255) unique not null,
                display_name varchar(255) default null,
                description varchar(2550) default null,
                created_at timestamp not null default now(),
                updated_at timestamp not null default now(),
                created_by integer default null,
                constraint fk_user foreign key (created_by) references users(id) on delete set null
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table if exists roles
        `)
  }
}
