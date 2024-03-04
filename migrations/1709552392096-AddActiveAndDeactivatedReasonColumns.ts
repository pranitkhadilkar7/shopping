import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddActiveAndDeactivatedReasonColumns1709552392096
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table users 
            add column active boolean not null default true,
            add column deactivated_reason varchar(255) default null
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            alter table users 
            drop column if exists active,
            drop column if exists deactivated_reason 
        `)
  }
}
