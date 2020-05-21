const Partner = require('../models/partnerModel');
const factory = require('./handlerFactory');



exports.getAllPartners = factory.getAll(Partner);
exports.getPartner = factory.getOneById(Partner);
exports.addPartner = factory.createOne(Partner);
exports.updatePartner = factory.updateOneById(Partner);
exports.deletePartner = factory.deleteOneById(Partner);