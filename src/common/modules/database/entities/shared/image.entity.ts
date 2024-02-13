import { ImagesTypes } from '@database/types/enums.type';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';
import { Base } from './base.entity';

export class Image extends Base {
  @ApiProperty({
    description: 'URL of the image',
  })
  @Column({ type: 'text' })
  url: string;

  @ApiProperty({ description: 'Width of the image in pixels' })
  @Column({ type: 'int', name: 'width_px' })
  width: number;

  @ApiProperty({ description: 'Height of the image in pixels' })
  @Column({ type: 'int', name: 'height_px' })
  height: number;

  @ApiProperty({
    description: 'Alternate text for the image',
    nullable: true,
  })
  @Column({
    type: 'varchar',
    length: 125,
    name: 'image_alt',
    nullable: true,
    default: 'Image default',
  })
  alt?: string;

  @ApiProperty({
    description: 'Public ID of the image in Cloudinary',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, name: 'public_id', nullable: true })
  publicId?: string;

  @Exclude()
  @Column({ type: 'enum', enum: ImagesTypes, name: 'image_type' })
  type: string;

  @Exclude()
  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'size_kb' })
  size: number;
}
