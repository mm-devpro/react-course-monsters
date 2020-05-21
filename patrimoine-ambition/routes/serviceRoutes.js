const express = require('express');
const serviceController = require('../controllers/serviceController');
const authController = require('../controllers/authController');
const photoHandler = require('./../utils/photoHandler');


const router = express.Router();

router
    .route('/')
    .get(serviceController.getAllServices)
    .post(
        authController.protect,
        authController.restrictTo('super-admin'),
        photoHandler.uploadImage,
        photoHandler.resizeServiceImage,
        serviceController.createService)

router
    .route('/:slug')
    .get(serviceController.getService)
    .patch(
        authController.protect,
        photoHandler.uploadImage,
        photoHandler.resizeServiceImage,
        serviceController.updateService)
    .delete(authController.protect, serviceController.deleteService)

module.exports = router;