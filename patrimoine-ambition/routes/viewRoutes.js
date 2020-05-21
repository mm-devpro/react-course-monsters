const express = require('express');
const authController = require('../controllers/authController');
const viewAdminController = require('../controllers/viewAdminController');
const viewController = require('../controllers/viewController');


const router = express.Router();

//-----------MAIN WEBSITE----------//

router
    .route('/')
    .get(viewController.getOverview);

router
    .route('/notre-equipe')
    .get(viewController.getEmployees);

router
    .route('/objectifs/:slug')
    .get(viewController.getOneService);
router
    .route('/mentions-legales')
    .get(viewController.getLegalNotices);

router
    .route('/nos-partenaires')
    .get(viewController.getPartners);


//------------ ADMIN -------------//

router.get('/my-pa-admin/login', authController.isLoggedIn, viewAdminController.getLoginForm)

router.use(authController.protect, authController.restrictTo('super-admin'))
router
    .route('/my-pa-admin/objectifs')
    .get(viewAdminController.getAllServices)
router
    .route('/my-pa-admin/equipe')
    .get(viewAdminController.getAllEmployees)
router
    .route('/my-pa-admin/partenaires')
    .get(viewAdminController.getAllPartners)
router
    .route('/my-pa-admin/settings')
    .get(viewAdminController.getAccountDetails)



module.exports = router;