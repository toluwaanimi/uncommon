import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

// This class defines the data transfer object (DTO) for filtering orders
export class OrderFilterParamsDTO {
  // ApiProperty decorator provides metadata for the Swagger UI
  @ApiProperty({
    description: 'The type of the order',
    required: false,
    type: String,
  })
  // IsOptional decorator indicates that this property is not required
  @IsOptional()
  // IsString decorator ensures that the value is a string
  @IsString()
  order_type?: string;

  @ApiProperty({
    description: 'The minimum price',
    required: false,
    type: Number,
  })
  @IsOptional()
  // IsNumber decorator ensures that the value is a number
  @IsNumber()
  // Min decorator ensures that the value is greater than or equal to zero
  @Min(0)
  // Transform decorator converts the value to a floating point number
  @Transform(({ value }) => parseFloat(value))
  price_min?: number;

  @ApiProperty({
    description: 'The maximum price',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseFloat(value))
  price_max?: number;

  @ApiProperty({
    description: 'The page number',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @ApiProperty({
    description: 'The number of items to offset',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10))
  offset?: number;
}
