import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListPage } from './item-list.page';

describe('ItemListPage', () => {
  let component: ItemListPage;
  let fixture: ComponentFixture<ItemListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
