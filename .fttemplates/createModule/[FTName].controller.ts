import { Controller } from '@nestjs/common';
import { [FTName | capitalize]ControllerInterface } from './interfaces/[FTName]Controller';
import { [FTName | capitalize]Service } from './[FTName].service';

@Controller()
export class [FTName | capitalize]Controller implements [FTName | capitalize]ControllerInterface {
  constructor(private [FTName]Service: [FTName | capitalize]Service) {}
}
