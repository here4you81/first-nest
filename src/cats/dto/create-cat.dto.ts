// 사용법: https://docs.nestjs.kr/pipes#schema-based-validation
// 클래스 유효성 검증: https://docs.nestjs.kr/pipes#class-validator
// npm 라이브러리: $ npm i --save class-validator class-transformer
// 개발절차
// 1: DTO 클래스 구현
// 2: npm 라이브러리 설치
// 3: 검증 파이프 구현(필요시)
// 3: 컨트롤러에 클래스 주입(Post방식의 create 메소드)
// 4: 파이프 바인딩(메인, 앱, 모듈)

import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
    // 각 필드에 검증을 위해 데코레이터 부여

    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    breed: string;
}
