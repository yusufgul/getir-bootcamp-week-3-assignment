const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.param("id", bookController.checkID);

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.checkData, bookController.createBook);
router
  .route("/:id")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
