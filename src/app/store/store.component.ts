import {
  Component,
  EventEmitter,
  Input,
  IterableDiffers,
  OnInit,
  Output,
} from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  @Input() item: Item | undefined;
  @Output('addToCart') addsToCart = new EventEmitter<Item>();
  itemPicture: string | undefined;
  itemName: string | undefined;
  ngOnInit() {
    this.itemPicture = 'assets/icons/' + this.item?.id + '.svg';
  }
  addToCart() {
    {
      if (!this.item) {
        throw new Error('cannot add null');
      }
      this.addsToCart.emit(this.item);
    }
  }
}
