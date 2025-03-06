import { Entry, EntryFieldTypes } from 'contentful';
import { ContentfulBaseSkeleton } from './ContenfulBaseSkeleton';

export interface ContentfulProductSkeleton extends ContentfulBaseSkeleton {
  fields: {
    sku: EntryFieldTypes.Text;
    name: EntryFieldTypes.Text;
    brand: EntryFieldTypes.Text;
    model: EntryFieldTypes.Text;
    price: EntryFieldTypes.Number;
    currency: EntryFieldTypes.Text;
    stock: EntryFieldTypes.Number;
    category: EntryFieldTypes.Text;
  };
}

export type ContentfulProduct = Entry<ContentfulProductSkeleton>;
