import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Item } from './models/item';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FruitService {
  constructor(private readonly http: HttpClient) {}

  async getFruits() {
    const fruits = await firstValueFrom(
      this.http.get<Item[]>(environment.apiFruits)
    );
    return fruits;
  }

  async getVegetables() {
    const veggies = await firstValueFrom(
      this.http.get<Item[]>(environment.apiVegetables)
    );
    return veggies;
  }
}
