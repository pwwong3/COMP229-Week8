import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart.modules';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(
    public cart: Cart,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  viewCart(): void {
    this.router.navigateByUrl('/cart')
  }

}
