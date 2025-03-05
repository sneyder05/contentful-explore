import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryColumn()
  sku!: string;

  @Column()
  name!: string;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  category!: string;

  @Column()
  price!: number;

  @Column()
  currency!: string;

  @Column()
  stock!: number;
}
