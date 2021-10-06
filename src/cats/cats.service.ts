import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

// 서비스: https://docs.nestjs.kr/providers#services
// 라이프 사이크 후크: 서비스의 생명주기별로 이벤트 처리방법(onModuleInit)
// 라이프사이클: https://docs.nestjs.kr/fundamentals/lifecycle-events

@Injectable()
export class CatsService {


  create(createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
