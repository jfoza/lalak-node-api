import { HttpPresenter } from '@/common/presentation/http/presenters/http.presenter';
import {
  IAuthUser,
  IJwtTokenAuthUser,
} from '@/features/auth/domain/services/login.service.interface';
import { Ability } from '@/acl/domain/entities/ability';

export interface IHttpAuthPresenter {
  token: string;
  type: string;
  expiresIn: string;
  user: { abilities: Ability[] } & Omit<IAuthUser, 'password'>;
}

export class HttpCustomerAuthPresenter extends HttpPresenter<
  IJwtTokenAuthUser,
  IHttpAuthPresenter
> {
  static toHTTP(): HttpCustomerAuthPresenter {
    return new this();
  }

  from(entity: IJwtTokenAuthUser): IHttpAuthPresenter {
    const { jwtToken, user, abilities } = entity;

    const {
      userUuid,
      name,
      email,
      shortName,
      profileUuid,
      profileDescription,
      profileUniqueName,
      active,
      createdAt,
      birthDate,
      phone,
      zipCode,
      address,
      numberAddress,
      complement,
      district,
      uf,
      cityUuid,
      cityDescription,
    } = user;

    return {
      token: jwtToken.token,
      type: jwtToken.type,
      expiresIn: `${jwtToken.expiration / 86400} days`,
      user: {
        userUuid,
        name,
        email,
        shortName,
        profileUuid,
        profileDescription,
        profileUniqueName,
        active,
        createdAt,
        birthDate,
        phone,
        zipCode,
        address,
        numberAddress,
        complement,
        district,
        uf,
        cityUuid,
        cityDescription,
        abilities,
      },
    };
  }
}
