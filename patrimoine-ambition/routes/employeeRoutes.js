const express = require('express');
const employeeController = require('./../controllers/employeeController');
const authController = require('./../controllers/authController');
const photoHandler = require('./../utils/photoHandler');

const router = express.Router();

router
    .route('/')
    .get(employeeController.getAllEmployees)
    .post(
        authController.protect,
        authController.restrictTo('super-admin'),
        photoHandler.uploadImage,
        photoHandler.resizeEmployeePhoto,
        employeeController.createEmployee);

router
    .route('/:slug')
    .get(employeeController.getOneEmployee)
    .patch(
        authController.protect,
        photoHandler.uploadImage,
        photoHandler.resizeEmployeePhoto,
        employeeController.updateEmployee
    )
    .delete(authController.protect, employeeController.deleteEmployee)


module.exports = router;