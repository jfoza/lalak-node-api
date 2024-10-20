import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from '@/jwt/presentation/middlewares/jwt.middleware';
import { UserModule } from '@/features/user/infra/modules/user.module';
import { JwtModule } from '@/jwt/infra/modules/jwt.module';
import { RedisModule } from '@/redis/infra/modules/redis.module';
import { DatabaseModule } from '@/database/infra/modules/database.module';
import { AclModule } from '@/acl/infra/modules/acl.module';
import { AuthModule } from '@/features/auth/infra/modules/auth.module';
import { CustomerModule } from '@/features/customer/infra/modules/customer.module';
import { CityModule } from '@/features/city/infra/modules/city.module';
import { MailModule } from '@/mail/infra/modules/mail.module';
import { AmqpModule } from '@/amqp/infra/modules/amqp.module';
import { ThemeModule } from '@/features/themes/infra/modules/theme.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule,
    DatabaseModule,
    RedisModule,
    AmqpModule,
    MailModule,
    AclModule,
    AuthModule,
    CityModule,
    UserModule,
    CustomerModule,
    ThemeModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
