import { Request, Response } from 'express';
import { ItemService } from '../../../app/services/itemService';
import { MongoItemRepository } from '../repositories/mongoLoginRepository';
import { Item } from '../../../domain/entities/item';

const itemRepository = new MongoItemRepository();
const itemService = new ItemService(itemRepository);

export const addItens = async (req: Request, res: Response) => {
  try {
    const itemBody = req.body;
    itemBody.forEach(async (item: Item) => {
      await itemService.createItem(item.name, item.link, item.quantity);
    });

    return res.status(200).json(true);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};

export const fetchItens = async (req: Request, res: Response) => {
  try {
    const itens = await itemService.getAllItens();
    res.status(200).json(itens);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
};
