import { IsString, Length } from 'class-validator';

export class EncryptDto {
  @IsString()
  @Length(1, 2000)
  payload: string;
}
