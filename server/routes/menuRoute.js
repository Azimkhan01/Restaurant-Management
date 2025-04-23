const { addCategory, showCategory } = require('../controller/categoryController')
const { addDish, showDish, ShowDishById } = require('../controller/dishController')

const router = require('express').Router()

router.route('/add-category').post(addCategory)
router.route('/add-dish').post(addDish)
router.route('/show-category').get(showCategory)
router.route('/show-dishes').get(showDish)
router.route('/show-dishes/:id').get(ShowDishById)
module.exports = router