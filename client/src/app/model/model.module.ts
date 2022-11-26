import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BookRepository } from './book.repository';
import { Cart } from './cart.modules';
import { Order } from './order.model';
import { OrderRepository } from './order.respository';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';

@NgModule({
    imports: [HttpClientModule],
    providers: [BookRepository, StaticDataSource, Cart, Order, OrderRepository, RestDataSource,
    { provide: StaticDataSource, useClass: RestDataSource }]
})
export class ModelModule {}