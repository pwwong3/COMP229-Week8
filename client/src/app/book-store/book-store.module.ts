import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from '../model/model.module';
import { BookStoreComponent } from "./book-store.component";
import { CounterDirective } from "./counter.directive";
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule],
    declarations: [BookStoreComponent, CounterDirective, CartDetailComponent, CheckoutComponent],
    exports: [BookStoreComponent, CounterDirective, CartDetailComponent, CheckoutComponent]
})
export class BookStoreModule {}