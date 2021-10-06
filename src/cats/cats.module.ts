// 라이프 사이크 후크: 생명주기별로 이벤트 처리방법(onModuleInit)
// 라이프사이클: https://docs.nestjs.kr/fundamentals/lifecycle-events

import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilterFilter } from 'src/common/exceptions/http-exception-filter.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';


@Module({
  controllers: [CatsController],
  providers: [
    CatsService,
    // 모듈 단위의 익셉션필터를 사용할 경우
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilterFilter,
    // },

    // 모듈 단위 파이프를 사용할 경우
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },

    // 모듈 단위 인터셉터 적용
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // }

  ]
})
export class CatsModule { }
