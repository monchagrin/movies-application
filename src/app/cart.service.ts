import { Injectable } from '@angular/core';
import { Item } from './models/item';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new Map<Item, number>();
  private cartSubject = new BehaviorSubject<Map<Item, number>>(new Map());

  getAllItems(): BehaviorSubject<Map<Item, number>> {
    return this.cartSubject;
  }

  addToCart(item: Item) {
    if (this.cart.has(item)) {
      this.cart.set(item, this.cart.get(item)! + 1);
    } else {
      this.cart.set(item, 1);
    }
    this.cartSubject.next(new Map(this.cart));
  }

  deleteFromCart(item: Item) {
    if (this.cart.has(item)) {
      if (this.cart.get(item)! - 1 > 0) {
        this.cart.set(item, this.cart.get(item)! - 1);
      } else {
        this.cart.delete(item);
      }
      this.cartSubject.next(new Map(this.cart));
    }
  }
  getTotalPrice(): Observable<number> {
    return this.cartSubject.asObservable().pipe(
      map((cart) => {
        let totalPrice = 0;
        for (const [item, quantity] of cart.entries()) {
          totalPrice += item.price * quantity;
        }
        return totalPrice;
      })
    );
  }
}
