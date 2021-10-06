// 파이프: 클라이언트로부터 수신된 데이터 변환과 유효성 검증에 사용
// 생성 방법: $ nest g pi Validation common/pipes
// npm 라이브러리: $ npm i --save class-validator class-transformer

import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {

  async transform(value: any, { metatype }: ArgumentMetadata) {

    console.log("ValidationPipe");

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
