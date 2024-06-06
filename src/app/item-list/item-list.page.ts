import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  items: Item[] = [];  // Inicialización correcta
  filterCriteria: string = '';
  filterValue: string = '';

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onFilterChange() {
    if (this.filterCriteria === 'unidad') {
      this.items = this.itemService.filterItemsByUnidad(this.filterValue);
    } else if (this.filterCriteria === 'producto') {
      this.items = this.itemService.filterItemsByProducto(this.filterValue);
    } else {
      this.items = this.itemService.getItems();  // Mostrar todos los ítems si no hay criterio de filtro
    }
  }

  addItem() {
    this.router.navigate(['/add-item']);
  }

  editItem(index: number) {
    this.router.navigate(['/edit-item', index]);
  }

  deleteItem(index: number) {
    this.itemService.deleteItem(index);
    this.items = this.itemService.getItems();
  }
}
