import { IsString } from 'class-validator';

export class DecryptDto {
  @IsString()
  data1: string;

  @IsString()
  data2: string;
}
