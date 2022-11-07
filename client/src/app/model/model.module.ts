import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BookRepository } from './book.repository';
import { Cart } from './cart.modules';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';

@NgModule({
    imports: [HttpClientModule],
    providers: [BookRepository, StaticDataSource, Cart,
    {provide: StaticDataSource, useClass: RestDataSource }]
})
export class ModelModule {}