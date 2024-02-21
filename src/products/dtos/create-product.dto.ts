import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
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
  model: string

  @IsString()
  @MinLength(4)
  modelYear: string

  @IsNumber()
  price: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  size: string

  @IsNumber()
  @Min(1)
  quantity: number
}
