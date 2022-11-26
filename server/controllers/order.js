const express = require('express');
const router = express.Router();

const Order = require('../model/order');
const Store = require('../model/store');
const Cart = Store.Cart;
const Book = Store.Book;

module.exports.displayOrderList = (req, res, next) => {
    Order.find((err, orderList) => {
        if(err) return console.error(err);
        res.json(orderList);
    });
};

module.exports.processAddPage = (req, res, next) => {
    // Serialize the cart data
    let cart = new Cart();
    for (let line of req.body.cart.lines) {
        const book = new Book(
            line.book._id,
            line.book.name,
            line.book.author,
            line.book.description,
            line.book.price
        );
        const quantity = line.quantity;
        cart.lines.push({book, quantity});
    }
    cart.itemCount = req.body.cart.itemCount;
    cart.cartPrice = req.body.cart.carPrice;

    // Create a new Object View
    const newOrder = ({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        contry: req.body.country,
        shipped: req.body.shipped,
        cart
    });

    // Add new Order Object to the Database
    Order.create(newOrder, (err, Order) => {
        if(!err) res.json({ success: true, msg: "Successfully added new Order"});
        console.log(err);
        res.end(err);
    })
}