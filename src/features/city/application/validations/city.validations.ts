import { NotFoundException } from '@nestjs/common';
import { ErrorMessagesEnum } from '@/utils/enums/error-messages.enum';
import { City } from '@/features/city/domain/entities/city';
import { CityRepository } from '@/features/city/domain/repositories/city.repository';

export class CityValidations {
  static async cityExists(
    uuid: string,
    cityRepository: CityRepository,
  ): Promise<City> {
    const city = await cityRepository.findById(uuid);

    if (!city) {
      throw new NotFoundException(ErrorMessagesEnum.CITY_NOT_FOUND);
    }

    return city;
  }
}
