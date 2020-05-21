const Employee = require('./../models/employeeModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getAllEmployees = factory.getAll(Employee);
exports.getOneEmployee = factory.getOneBySlug(Employee);
exports.createEmployee = factory.createOne(Employee);
exports.updateEmployee = factory.updateOne(Employee);
exports.deleteEmployee = factory.deleteOne(Employee);

