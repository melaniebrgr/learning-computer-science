import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<html><body><h1>Hello World!!!</h1></body></html>';
  }
}
