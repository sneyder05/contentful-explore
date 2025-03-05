import { Product } from '../entity/Product';
import { ProductDto } from '../model/ProductDto';

export function toProductDto(product: Product): ProductDto {
  return {
    sku: product.sku,
    name: product.name,
    brand: product.brand,
    model: product.model,
    category: product.category,
    price: product.price,
    currency: product.currency,
    stock: product.stock,
  };
}
