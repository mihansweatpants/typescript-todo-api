import { MigrationInterface, QueryRunner } from 'typeorm';
import { UsersSeed } from '~/db/seed/users.seed';
import { getUserRepository } from '../entity/User';

export class SeedUsers1559413061646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await getUserRepository().save(UsersSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
