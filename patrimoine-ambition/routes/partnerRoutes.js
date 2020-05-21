const express = require('express');
const partnerController = require('../controllers/partnerController');
const authController = require('../controllers/authController');
const photoHandler = require('./../utils/photoHandler');


const router = express.Router();

router
    .route('/')
    .get(partnerController.getAllPartners)
    .post(
        authController.protect,
        authController.restrictTo('super-admin'),
        photoHandler.uploadImage,
        photoHandler.resizePartnerImage,
        partnerController.addPartner)

router
    .route('/:id')
    .get(partnerController.getPartner)
    .patch(
        authController.protect,
        photoHandler.uploadImage,
        photoHandler.resizePartnerImage,
        partnerController.updatePartner)
    .delete(authController.protect, partnerController.deletePartner)

module.exports = router;