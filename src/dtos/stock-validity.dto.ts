import { IsNotEmpty, IsString, IsInt, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';


class StockCheckItemDto {
	@IsNotEmpty({ message: 'Product code is required' })
	@IsString({ message: 'Product code must be a string' })
	public productCode: string;

	@IsNotEmpty({ message: 'Quantity is required' })
	@IsInt({ message: 'Quantity must be an integer' })
	@Min(1, { message: 'Quantity must be at least 1' })
	public quantity: number;
}

export class StockCheckDto {
	@IsArray({ message: 'Items must be an array' })
	@ValidateNested({ each: true }) 
	@Type(() => StockCheckItemDto)
	public items: StockCheckItemDto[];
}
