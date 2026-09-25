import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <-- Importación
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // <-- Registra el módulo para leer el .env
    UsersModule,
    PaymentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}