import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiUrl = "http://localhost:3000/api/get-product";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<any> {
    return this.http.post<Product>('http://localhost:3000/api/create-product', product, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('Add Product'))
      );
  }

  getProduct(id): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url)
    .pipe(
      tap(_ => console.log(`Product fetched=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }


  getOneProduct(id): Observable<Product> {
    var url = 'http://localhost:3000/api/get-product/' + id;
    return this.http.get<Product>(url)
    .pipe(
        tap(_ => console.log(`Product fetched: ${id}`)),
        catchError(this.handleError<Product>(`Get Product id=${id}`))
      );
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/api')
      .pipe(
        tap(Products => console.log('Products fetched!')),
        catchError(this.handleError<Product[]>('Get Products', []))
      );
  }

  updateProduct(id, Product: Product): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-product/' + id, Product, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Product updated: ${id}`)),
        catchError(this.handleError<Product>('Update Product'))
      );
  }

  deleteProduct(id): Observable<Product> {
    return this.http.delete<Product>('http://localhost:3000/api/delete-product/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Product deleted: ${id}`)),
        catchError(this.handleError<Product>('Delete Product'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}