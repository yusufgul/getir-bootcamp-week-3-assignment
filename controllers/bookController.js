const fs = require("fs");

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data/books.json`));

//check for whether id is valid
exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > books.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

//check if every information is exist
exports.checkData = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.page ||
    !req.body.statue ||
    !req.body.author ||
    !req.body.year
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Missing data. Please provide necessary informations.",
    });
  }
  next();
};
//list all books
exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
};
//list one book from id
exports.getBook = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};
//create a new book
exports.createBook = (req, res) => {
  const newId = parseInt(books[books.length - 1].id) + 1;
  const newBook = Object.assign({ id: newId }, req.body);

  books.push(newBook);

  fs.writeFile(
    `${__dirname}/../data/books.json`,
    JSON.stringify(books),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          book: newBook,
        },
      });
    }
  );
};

//update informations of one book
exports.updateBook = (req, res) => {
  let dataOrigin = require(`${__dirname}/../data/books.json`);
  let data = req.body;
  let id = req.params.id - 1;

  for (const element1 in dataOrigin[id]) {
    for (const element2 in data) {
      if (element1 === element2) {
        dataOrigin[id][element1] = data[element2];
      }
    }
  }
  fs.writeFile(
    `${__dirname}/../data/books.json`,
    JSON.stringify(dataOrigin),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          books: dataOrigin,
        },
      });
    }
  );
};
//delete one book
exports.deleteBook = (req, res) => {
  let dataOrigin = require(`${__dirname}/../data/books.json`);
  let id = req.params.id - 1;

  dataOrigin.splice(id, 1);
  fs.writeFile(
    `${__dirname}/../data/books.json`,
    JSON.stringify(dataOrigin),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          books: dataOrigin,
        },
      });
    }
  );
};
