const express = require("express")
const auth = require('../middleware/auth')
const multer = require('../middleware/multer_config')
const sharp = require('../middleware/sharp_config')
const router = express.Router()

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getAllBooks)
router.get('/bestrating', bookCtrl.getBestRating)
router.get('/:id', bookCtrl.getOneBook)
router.post('/', auth, multer, sharp, bookCtrl.addBook)
router.put('/:id', auth, multer, sharp, bookCtrl.modifyBook)
router.delete('/:id', auth, bookCtrl.deleteBook)
router.post('/:id/rating', auth, bookCtrl.addGrade)

module.exports = router