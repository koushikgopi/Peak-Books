import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmailDto {
  @ApiProperty({
    description: ' The invoice id',
    example: '12',
  })
  @IsNotEmpty()
  invoiceId: number;

  @ApiProperty({
    description: ' The from address',
    example: 'support@truwavesoftware.com',
  })
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    description: ' The to address',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: ' The subject',
    example: 'invoice pdf',
  })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: ' The message',
    example: 'the invoice pdf generation',
  })
  @IsNotEmpty()
  message: string;
}
