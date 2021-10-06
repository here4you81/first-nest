// 파이프: 클라이언트로부터 수신된 데이터 변환과 유효성 검증에 사용
// 생성 방법: $ nest g pi JoiValidationPipe common / pipes
// npm 라이브러리: $ npm install --save joi
// npm 개발용 라이브러리: $ npm install --save-dev @types/joi

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';


@Injectable()
export class JoiValidationPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
