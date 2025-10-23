const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
	const employees = await Employee.find();
	if (!employees) {
		return res.status(204).json({ message: 'No employees found' });
	}
	res.json(employees);
};

const createEmployee = async (req, res) => {
	if (!req?.body?.firstname || !req?.body?.lastname) {
		return res
			.status(400)
			.json({ message: 'First and Last names are required' });
	}

	try {
		const result = await Employee.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		});
		console.log(result);
		res.status(201).json({ message: 'Employee created !!' });
	} catch (err) {
		console.error(err);
	}
};

const updateEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: 'ID parameter is required.' });
	}
	const employee = await Employee.findOne({ _id: req.body.id }).exec();
	if (!employee) {
		return res
			.status(204)
			.json({ message: `No Employee matches ID ${req.body.id}` });
	}

	if (req.body?.firstname) employee.firstname = req.body.firstname;
	if (req.body?.lastname) employee.lastname = req.body.lastname;

	const result = await employee.save();
	res.console.log(result);
};

const deleteEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: 'Employee ID required' });
	}
	const employee = await Employee.findOne({ _id: req.body.id }).exec();
	if (!employee) {
		return res
			.status(204)
			.json({ message: 'No employee matches ID: ' + req.body.id });
	}
	const result = await employee.deleteOne({ _id: req.body.id });
	console.log(result);
	res.json(result);
};

const getEmployee = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: 'Employee ID required' });
	}
	const employee = await Employee.findOne({ _id: req.params.id }).exec();

	res.json(employee);
};

module.exports = {
	getAllEmployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
};
