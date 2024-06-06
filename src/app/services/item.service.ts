import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly storageKey = 'items';
  private items: Item[] = [];

  constructor() {
    this.loadItems();
  }

  private saveItems() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadItems() {
    const savedItems = localStorage.getItem(this.storageKey);
    if (savedItems) {
      this.items = JSON.parse(savedItems).map((itemData: any) => new Item(itemData));
    } else {
      this.items = [];
    }
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Item) {
    this.items.push(item);
    this.saveItems();
  }

  updateItem(index: number, item: Item) {
    this.items[index] = item;
    this.saveItems();
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.saveItems();
  }

  getItem(index: number): Item {
    return this.items[index];
  }

  filterItemsByUnidad(unidad: string): Item[] {
    return this.items.filter(item => item.unidad.toLowerCase().includes(unidad.toLowerCase()));
  }

  filterItemsByProducto(producto: string): Item[] {
    return this.items.filter(item => item.producto.toLowerCase().includes(producto.toLowerCase()));
  }
}
