import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('deleted_product')
export class DeletedProduct {
  @PrimaryColumn()
  sku!: string;

  @Column({ name: 'deleted_at' })
  deletedAt!: Date;
}
