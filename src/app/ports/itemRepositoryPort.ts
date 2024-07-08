import { Item } from '../../domain/entities/item';

export interface ItemRepositoryPort {
  createItem(user: Item): Promise<Item>;
  getAllItens(): Promise<Item[]>;
}