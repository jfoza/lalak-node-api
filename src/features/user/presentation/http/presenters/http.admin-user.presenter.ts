import { HttpPresenter } from '@/common/presentation/http/presenters/http.presenter';
import { User } from '@/features/user/domain/entities/user';

export interface IHttpAdminUser {
  uuid: string;
  name: string;
  email: string;
  shortName: string;
  profileUuid: string;
  profileDescription: string;
  profileUniqueName: string;
  active: boolean;
  createdAt: Date;
}

export class HttpAdminUserPresenter extends HttpPresenter<
  User,
  IHttpAdminUser
> {
  static toHTTP(): HttpAdminUserPresenter {
    return new this();
  }

  from(entity: User): IHttpAdminUser {
    return {
      uuid: entity.uuid,
      name: entity.person.name,
      email: entity.email,
      shortName: entity.person.shortName,
      profileUuid: entity.profileUuid,
      profileDescription: entity.profile.description,
      profileUniqueName: entity.profile.uniqueName,
      active: entity.active,
      createdAt: entity.createdAt,
    };
  }
}
