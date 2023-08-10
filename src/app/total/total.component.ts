import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css'],
})
export class TotalComponent {
  totalprice: Number = 0;
  formattedTotal: string | null = '';
  constructor(private readonly cartService: CartService) {
    this.cartService.getTotalPrice().subscribe((totalprice) => {
      this.totalprice = totalprice;
      this.formattedTotal = String(totalprice);
    });
  }
}
