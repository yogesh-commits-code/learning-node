const data = {
	employees: require('../model/employees.json'),
	setEmployees: function (data) {
		this.employees = data;
	},
};

const getAllEmployees = (req, res) => {
	res.json(data.employees);
};

const createEmployee = (req, res) => {
	const newEmployee = {
		id: data.employees[data.employees.length - 1].id + 1 || 1,
	};
};

const updateEmployee = (req, res) => {
	res.json({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
	});
};

const deleteEmployee = (req, res) => {
	res.json({
		id: req.body.id,
	});
};

const getEmployee = (req, res) => {
	res.json({
		id: req.params.id,
	});
};

module.exports = {
	getAllEmployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
