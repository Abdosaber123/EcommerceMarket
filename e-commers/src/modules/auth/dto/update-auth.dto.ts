import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-user';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
