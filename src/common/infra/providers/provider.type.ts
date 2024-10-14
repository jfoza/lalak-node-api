import { Provider } from '@nestjs/common';

export type ProvidersType = {
  repositoryProviders: Provider[];
  serviceProviders: Provider[];
  useCaseProviders: Provider[];
  mappersProviders?: Provider[];
  register(): Provider[];
  exports(): any[];
};
