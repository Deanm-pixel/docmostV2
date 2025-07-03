import { IsOptional, IsString, IsArray } from 'class-validator';

export class FilterPagesDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  creatorId?: string;

  // Hier kannst du weitere Filter ergänzen, z.B. Datum etc.
}
