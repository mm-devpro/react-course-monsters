const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Employee = require('../models/employeeModel');
const Partner = require('../models/partnerModel');
const Service = require('../models/serviceModel');
const User = require('../models/userModel');

exports.getAllServices = catchAsync(async (req, res, next) => {
    const services = await Service.find();

    res.status(200).render('adminServices', {
        title: 'Services',
        services
    })
});
exports.getAllEmployees = catchAsync(async (req, res, next) => {
    const employees = await Employee.find();

    res.status(200).render('adminEmployee', {
        title: 'Equipe',
        employees
    })
});
exports.getAllPartners = catchAsync(async (req, res, next) => {
    const partners = await Partner.find();

    res.status(200).render('adminPartners', {
        title: 'Partenaires',
        partners
    })
});


exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log in'
    })
}

exports.getAccountDetails = catchAsync(async (req,res,next) => {
    const user = await User.findOne({_id: req.user.id});

    res.status(200).render('adminAccount', {
        title: `Mon compte`,
        user
    })
})