import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent {
  cart: Map<Item, number> = new Map();
  constructor(private readonly cartService: CartService) {
    this.cartService.getAllItems().subscribe((cart) => {
      this.cart = cart;
    });
  }
  getCartKeysAsArray(): Item[] {
    return Array.from(this.cart.keys());
  }
  getItemPic(item: Item) {
    console.log('assets/icons/' + item.id + '.svg');
    return 'assets/icons/' + item.id + '.svg';
  }
  addItem(item: Item) {
    this.cartService.addToCart(item);
  }
  removeItem(item: Item) {
    this.cartService.deleteFromCart(item);
  }
}
