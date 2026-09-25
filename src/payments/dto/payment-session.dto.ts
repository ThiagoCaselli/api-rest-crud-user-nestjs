import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, IsString, ValidateNested, ArrayMinSize } from 'class-validator';

export class PaymentSessionItemDto {
  @IsString()
  name: string; //[cite: 1]

  @IsNumber()
  @IsPositive()
  price: number; //[cite: 1]

  @IsNumber()
  @IsPositive()
  quantity: number; //[cite: 1]
}

export class PaymentSessionDto {
  @IsString()
  orderId: string; //[cite: 1]

  @IsString()
  currency: string; //[cite: 1]

  @IsArray()
  @ArrayMinSize(1) //[cite: 1]
  @ValidateNested({ each: true }) //[cite: 1]
  @Type(() => PaymentSessionItemDto)
  items: PaymentSessionItemDto[];
}