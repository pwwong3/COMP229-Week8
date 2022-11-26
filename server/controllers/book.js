const Book = require("../model/books");

module.exports.displayBookList = (req, res, next) => {
  Book.find((err, bookList) => {
    if (!err) res.json(bookList);
    console.error(err);
    res.end(err);
  });
};

module.exports.displayAddPage = (req, res, next) => {
  res.json({ success: true, msg:"Successfully displayed add page"})
};

module.exports.processAddPage = (req, res, next) => {
  const newBook = Book({
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });
  Book.create(newBook, (err, Book) => {
    if (!err) res.json({ success: true, msg: "Successfully added new book"})
    console.log(err);
    res.end(err);
  });
};

module.exports.displayEditPage = (req, res, next) => {
  const id = req.params.id;
  Book.findById(id, (err, bookToEdit) => {
    if (!err) res.json({ success: true, msg: "Successfully display book to edit", book: bookToEdit })
    console.log(err);
    res.end(err);
  });
};

module.exports.processEditPage = (req, res, next) => {
  const id = req.params.id;
  console.log(req.body);
  const updatedBook = Book({
    _id: id,
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });
  Book.updateOne({ _id: id }, updatedBook, err => {
    if (!err) res.json({ success: true, msg: "Successfully edited book", book: updatedBook })
    console.log(err);
    res.end(err);
  });
};

module.exports.performDelete = (req, res, next) => {
  const id = req.params.id;
  Book.remove({ _id: id }, err => {
    if (!err) res.json({ success: true, msg: "Successfully deleted book" })
    console.log(err);
    res.end(err);
  });
};
