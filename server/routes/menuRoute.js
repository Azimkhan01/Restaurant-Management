const { addCategory, showCategory, deleteCategory } = require('../controller/categoryController')
const { addDish, showDish, ShowDishById, RemoveDish } = require('../controller/dishController')

const router = require('express').Router()

router.route('/add-category').post(addCategory)
router.route('/add-dish').post(addDish)
router.route('/show-category').get(showCategory)
router.route('/show-dishes').get(showDish)
router.route('/show-dishes/:id').get(ShowDishById)
router.route('/delete-dish/:id').delete(RemoveDish)
router.route('/delete-category/:id').delete(deleteCategory)
module.exports = router