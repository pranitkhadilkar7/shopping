import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersRolesTable1708330313104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            create table if not exists users_roles (
                user_id integer not null,
                role_id integer not null,
                constraint fk_user foreign key (user_id) references users(id),
                constraint fk_role foreign key (role_id) references roles(id)
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            drop table if exists users_roles
        `)
  }
}
