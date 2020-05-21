const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const photoHandler = require('./../utils/photoHandler');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);


router.use(authController.protect, authController.restrictTo('super-admin'))

router
    .route('/')
    .get(userController.getAllUsers)
    .post(photoHandler.uploadImage, photoHandler.resizeUserImage, userController.createUser)

router
    .route('/:id')
    .delete(userController.deleteUser);

router.get('/getMe', userController.getUser);

router
    .route('/updateMe')
    .patch(photoHandler.uploadImage, photoHandler.resizeUserImage, userController.updateMe)

router
    .route('/updateMyPassword')
    .patch(authController.updatePassword)



module.exports = router;