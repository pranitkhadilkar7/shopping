import { IsNumber, Min } from 'class-validator'

export class OrderCreateDto {
  @IsNumber()
  @Min(1)
  productId: number

  @IsNumber()
  @Min(1)
  productQuantity: number
}
