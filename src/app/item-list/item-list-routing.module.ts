import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListPage } from './item-list.page';

const routes: Routes = [
  {
    path: '',
    component: ItemListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemListPageRoutingModule {}
