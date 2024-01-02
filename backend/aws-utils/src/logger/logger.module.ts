import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './services';

@Module({})
export class LoggerModule {
  static forRoot(
    appName: string,
  ): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: 'APP_NAME',
          useValue: appName,
        },
      ],
      exports: [LoggerService],
    };
  }
}
