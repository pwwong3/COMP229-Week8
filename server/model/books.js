const mongoose = require('mongoose');
const bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
},
{
    collection:"books"
});

module.exports = mongoose.model('book',bookModel);