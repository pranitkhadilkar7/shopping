import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateVerificationTokenTable1709628926515
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists verification_tokens (
            id serial primary key,
            created_at timestamp not null default now(),
            created_by integer default null,
            expiry_date timestamp not null,
            token_type varchar(255) not null,
            token varchar(255) not null unique,
            user_id integer default null,
            role_id integer default null,
            email varchar(255) default null,
            constraint fk_creator_user foreign key (created_by) references users(id),
            constraint fk_user foreign key (user_id) references users(id),
            constraint fk_user_role foreign key (role_id) references roles(id)
        )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table if exists verification_tokens
        `)
  }
}
