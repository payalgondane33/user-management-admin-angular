import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  GET<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }
}
