import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilterFilter } from './common/exceptions/http-exception-filter.filter';
import { logger, LoggerMiddleware } from './common/middleware/logger.middleware';


@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 앱 단위의 익셉션필터를 사용할 경우
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilterFilter,
    // }
  ],
})
export class AppModule implements NestModule {
  // 미들웨어 적용: https://docs.nestjs.kr/middleware
  configure(consumer: MiddlewareConsumer) {
    // 특정 경로와 메소드에 적용하는 법
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });

    // 특정 컨트롤러에 적용하는 법
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats/:id', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);

    // 함수형 미들웨어 적용 법
    consumer
      .apply(logger)
      .forRoutes(CatsController);
  }
}
