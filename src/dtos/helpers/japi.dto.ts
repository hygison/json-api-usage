import { Type } from 'class-transformer';
import { IsEmpty, IsString, ValidateNested } from 'class-validator';

export class BasePostPatchDto<T> {
  @IsString()
  type: string;

  @ValidateNested()
  @Type(() => Object)
  attributes: T;

  @IsEmpty()
  relationships?: null;
}
