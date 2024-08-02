import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodProductsService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(response => console.log('Full API Response:', response)),
      map(response => response || []), // Ensure response is always an array
      catchError(error => {
        console.error('Error fetching all products:', error);
        throw error; // Rethrow or handle as needed
      })
    );
  }
  getProductById(productId: number | string): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url).pipe(
      catchError(error => {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error; // Rethrow or handle as needed
      })
    );
  }

  getRelatedProducts(productId: number | string): Observable<any[]> {
    // Simulate fetching related products by fetching a subset of products
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.id !== productId)), 
      catchError(error => {
        console.error(`Error fetching related products for ID ${productId}:`, error);
        throw error; // Rethrow or handle as needed
      })
    );
  }
}
