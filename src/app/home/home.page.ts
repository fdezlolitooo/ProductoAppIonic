import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lastUpdate!: Date;
  currentUser!: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.lastUpdate = new Date();  
    this.currentUser = 'Edwin Rueda - Vanessa Carrillo'; 
  }

  navigateToItemList() {
    this.router.navigate(['/item-list']);
  }

  navigateToAddItem() {
    this.router.navigate(['/add-item']);
  }
}
