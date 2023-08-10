import { Component, OnInit } from '@angular/core';
import { FruitService } from './fruit.service';
import { Item } from './models/item';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-green-grocers';
  isFruitButtonClicked = false;
  isVegetableButtonClicked = false;
  isEverythingButtonClicked = true;
  isSortedByPrice = false;
  isSortedByName = false;
  priceSorting = 'Price ▲';
  nameSorting = 'Name ▲';

  vegetables: Item[] = [];
  fruits: Item[] = [];
  filteredGroceries: Item[] = [];
  allGroceries: Item[] = [];
  cart = new Map();

  constructor(
    private readonly fruitService: FruitService,
    private readonly cartService: CartService
  ) {
    this.cartService.getAllItems().subscribe((cart) => {
      this.cart = cart;
    });
  }

  async ngOnInit() {
    this.vegetables = await this.fruitService.getVegetables();
    this.fruits = await this.fruitService.getFruits();
    this.filteredGroceries = [...this.vegetables, ...this.fruits];
    this.allGroceries = [...this.vegetables, ...this.fruits];
  }

  async addToCart(item: Item) {
    await this.cartService.addToCart(item);
    
  }

  showFilteredGroceries(groceries: Item[]) {
    this.filteredGroceries = groceries;
    this.isEverythingButtonClicked = groceries === this.allGroceries;
    this.isVegetableButtonClicked = groceries === this.vegetables;
    this.isFruitButtonClicked = groceries === this.fruits;
  }

  showOnlyFruits() {
    this.showFilteredGroceries(this.fruits);
  }

  showOnlyVegetables() {
    this.showFilteredGroceries(this.vegetables);
  }

  showEverything() {
    this.showFilteredGroceries([...this.vegetables, ...this.fruits]);
  }
  priceSortingButton() {
    this.priceSorting = this.isSortedByPrice ? 'Price ▲' : 'Price ▼';
  }

  async sortByPrice() {
    this.priceSortingButton();
    if (this.isSortedByPrice) {
      this.isSortedByPrice = !this.isSortedByPrice;
      this.filteredGroceries.sort((a: Item, b: Item) => a.price - b.price);
    } else {
      this.isSortedByPrice = !this.isSortedByPrice;
      this.filteredGroceries.sort((a: Item, b: Item) => b.price - a.price);
    }
  }

  nameSortingButton() {
    this.nameSorting = this.isSortedByName ? 'Name ▲' : 'Name ▼';
  }

  async sortByName() {
    this.nameSortingButton();
    if (this.isSortedByName) {
      this.isSortedByName = !this.isSortedByName;
      this.filteredGroceries.sort((a: Item, b: Item) =>
        a.name.localeCompare(b.name)
      );
    } else {
      this.isSortedByName = !this.isSortedByName;
      this.filteredGroceries.sort((a: Item, b: Item) =>
        b.name.localeCompare(a.name)
      );
    }
  }
}
