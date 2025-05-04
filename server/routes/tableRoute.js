const { addTable, showTable, deleteTable } = require('../controller/tableController')

const tableRouter = require('express').Router()

tableRouter.route('/add-table').post(addTable)
tableRouter.route('/show-table').get(showTable)
tableRouter.route('/remove-table/:id').delete(deleteTable)

module.exports = {tableRouter}