import { HttpException, HttpStatus } from "@nestjs/common";

// 커스텀 익셉셥: https://docs.nestjs.kr/exception-filters#custom-exceptions
export class ForbiddenException extends HttpException {
    constructor() {
        super('Forbidden Custom Exception', HttpStatus.FORBIDDEN);
    }
}