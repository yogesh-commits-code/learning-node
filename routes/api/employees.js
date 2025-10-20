const express = require('express');
const router = express.Router();
const path = require('path');
const data = {};
const employeesController = require('../../controllers/employeesControllers');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
	.route('/')
	.get(employeesController.getAllEmployees)
	.post(
		verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		employeesController.createEmployee
	)
	.put(
		verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
		employeesController.updateEmployee
	)
	.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router
	.route('/:id')
	.get(employeesController.getEmployee)
	.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

module.exports = router;
