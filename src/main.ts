// import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilterFilter } from './common/exceptions/http-exception-filter.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { globalLogger } from './common/middleware/logger.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 글로벌 미들웨어 적용법: https://docs.nestjs.kr/middleware#global-middleware
  app.use(globalLogger);
  // 글로벌 필터 적용법: https://docs.nestjs.kr/exception-filters#binding-filters
  app.useGlobalFilters(new HttpExceptionFilterFilter);
  // 글로벌 파이프 적용법: https://docs.nestjs.kr/pipes#global-scoped-pipes
  app.useGlobalPipes(new ValidationPipe);
  // 글로벌 인터셉터 적용법: https://docs.nestjs.kr/interceptors#binding-interceptors
  app.useGlobalInterceptors(new LoggingInterceptor);
  await app.listen(3000);
}
bootstrap();
