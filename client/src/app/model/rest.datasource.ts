import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { from, Observable } from "rxjs";
import { Book } from "./book.model";
import { Order } from "./order.model";

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getBooks(): Observable<Book[]>
    {
        return this.http.get<Book[]>(this.baseUrl + 'book-list');
    }
    
    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.baseUrl + 'orders', order);
    }
}