import { IAclRepository } from '@/acl/domain/interfaces/acl.repository.interface';
import { Ability } from '@/acl/domain/core/ability';
import { GetUserAbilitiesRoutine } from '@/acl/infra/database/typeorm/routines/get-user-abilities.routine';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AclRepository implements IAclRepository {
  constructor(
    private readonly getUserAbilitiesRoutine: GetUserAbilitiesRoutine,
  ) {}

  async findAllByUserId(userUuid: string): Promise<Ability[]> {
    return await this.getUserAbilitiesRoutine.setUserUuid(userUuid).run();
  }

  async getUserAbilityDescriptions(userUuid: string): Promise<string[]> {
    const results = await this.getUserAbilitiesRoutine
      .setUserUuid(userUuid)
      .run();

    return results.map((result: { description: string }) => result.description);
  }
}
