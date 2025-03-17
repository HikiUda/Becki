import { Injectable } from '@nestjs/common';
import { [FTName | capitalize]ServiceInterface } from './interfaces/[FTName]Service';
import { [FTName | capitalize]Repository } from './[FTName].repository';

@Injectable()
export class [FTName | capitalize]Service implements [FTName | capitalize]ServiceInterface {
  constructor(private [FTName]Repository: [FTName | capitalize]Repository) {}
}
