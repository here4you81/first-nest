// 발생한 익셉션을 클라이언트에게 전달할 때 원하는 스키마로 만들어서 전달 가능
// 생성방법: $ nest g f HttpExceptionFilter common/exceptions
// 사용법: 글로벌, 앱, 모듈, 컨트롤러, 특정 라우터 단위로 원하는 곳에 바인딩 가능
// 사용법: https://docs.nestjs.kr/exception-filters#binding-filters

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilterFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status)
      .json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        mydata: "I made this filtter"
      });
  }
}
