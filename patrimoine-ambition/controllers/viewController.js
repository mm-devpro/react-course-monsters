const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Employee = require('../models/employeeModel');
const Partner = require('../models/partnerModel')
const Service = require('../models/serviceModel');


exports.getOverview = catchAsync( async (req, res, next) => {
    const services = await Service.find();
    const employees = await Employee.find();

    res.status(200).render('overview', {
        title: 'Accueil',
        employees,
        services

    })
})
exports.getEmployees = catchAsync( async (req, res, next) => {
    const services = await Service.find();
    const team = await Employee.find();

    res.status(200).render('team', {
        title: 'Notre équipe',
        section: 'Notre équipe',
        team,
        services
    })
})

exports.getLegalNotices = catchAsync( async (req, res, next) => {
    const services = await Service.find();
    res.status(200).render('notices', {
        title: 'Mentions légales',
        section: 'Mentions légales',
        services
    })
})

exports.getOneService = catchAsync(async (req, res, next) => {
    const mainService = await Service.findOne({slug: req.params.slug});
    const services = await Service.find();

    res.status(200).render('service', {
        title: `${mainService.slug}`,
        section: 'Au service de vos objectifs - Notre Expertise',
        mainService,
        services
    })
});

exports.getPartners = catchAsync( async (req, res, next) => {
    const services = await Service.find();
    const partners = await Partner.find();
    res.status(200).render('partners', {
        title: 'Nos Partenaires',
        section: 'Nos Partenaires',
        services,
        partners
    })
})
