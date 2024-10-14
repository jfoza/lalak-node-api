import { ICityRepository } from '@/features/city/domain/interfaces/city.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/common/infra/enums/error-messages.enum';
import { City } from '@/features/city/domain/core/City';

export class CityValidations {
  static async cityExists(
    uuid: string,
    cityRepository: ICityRepository,
  ): Promise<City> {
    const city = await cityRepository.findById(uuid);

    if (!city) {
      throw new NotFoundException(ErrorMessagesEnum.CITY_NOT_FOUND);
    }

    return city;
  }
}
