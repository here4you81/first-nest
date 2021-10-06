import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseFilters, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors } from '@nestjs/common';
import { AllExceptionFilterFilter } from 'src/common/exceptions/all-exception-filter.filter';
import { ForbiddenException } from 'src/common/exceptions/forbidden.exception';
import { HttpExceptionFilterFilter } from 'src/common/exceptions/http-exception-filter.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

// 컨트롤러: https://docs.nestjs.kr/controllers

@Controller('cats')
// @UseFilters(HttpExceptionFilterFilter) // 컨트롤러 범위로 필터를 사용할 경우
// @UseGuards(RolesGuard)  // 컨트롤러에 가드를 적용할 경우
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  @SetMetadata('roles', ['admin'])
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  // 익셉션 발생: https://docs.nestjs.kr/exception-filters#throwing-standard-exceptions
  // 테스트: http://localhost:3000/cats/exception
  @Get('exception')
  async throwException() {
    console.log('Forbidden', HttpStatus.FORBIDDEN);

    // throw new HttpException('Forbidden!!!', HttpStatus.FORBIDDEN);

    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN);
  }

  // 커스텀 익셉셥: https://docs.nestjs.kr/exception-filters#custom-exceptions
  // 테스트: http://localhost:3000/cats/custom_exeception
  @Get('custom_exeception')
  async throwCustomException() {
    throw new ForbiddenException();
  }

  // 익셉션 필터: https://docs.nestjs.kr/exception-filters#exception-filters-1
  // 테스트: http://localhost:3000/cats/exception_filter
  @Get('exception_filter')
  // @UseFilters(new HttpExceptionFilter()) // 메모리 사용량이 늘어남으로 지양함
  @UseFilters(HttpExceptionFilterFilter)  // 이 방식이 메모리 사용량이 줄어서 유리함
  async useExceptionFilter() {
    throw new ForbiddenException();
  }

  @Get('all_exception')
  @UseFilters(AllExceptionFilterFilter)  // 이 방식이 메모리 사용량이 줄어서 유리함
  async useAllExceptionFilter() {
    throw new ForbiddenException();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.catsService.findOne(+id);
  // }

  // ParseIntPipe 파이프 설정: https://docs.nestjs.kr/pipes#binding-pipes
  // id를 정수형으로 변환하고 유효성을 검증하는 파이프
  // 테스트(true): http://localhost:3000/cats/123
  // 테스트(false): http://localhost:3000/cats/abc
  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }


}
