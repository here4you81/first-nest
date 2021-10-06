import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// 미들웨어 구현(https://docs.nestjs.kr/middleware)

// 미들웨어(클래스 타입)
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Class Type MW...');
        next();
    }
}

// 함수타입 미들웨어
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`Functional MW...`);
    next();
};

export function globalLogger(req: Request, res: Response, next: NextFunction) {
    console.log(`Global Logger MW...`);
    next();
};
