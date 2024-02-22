import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class EditProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(255)
  name: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(2550)
  description: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  model: string

  @IsString()
  @MinLength(4)
  @IsOptional()
  modelYear: string

  @IsNumber()
  @IsOptional()
  price: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  size: string

  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity: number
}
