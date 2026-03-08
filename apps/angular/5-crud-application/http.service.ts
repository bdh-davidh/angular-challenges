import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);

  fetchItems<T>(url: string) {
    return this.http.get<T[]>(url);
  }

  removeItem<T extends { id: string }>(url: string, itemToRemove: T) {
    return this.http.delete(`${url}${itemToRemove.id}`);
  }

  updateItem<T extends { id: string }>(url: string, item: T) {
    return this.http.put<T>(`${url}${item.id}`, item, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}
