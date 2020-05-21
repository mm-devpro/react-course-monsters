const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Remplissez le champ nom du partenaire'],
        trim: true
    },
    image: {
        type: String,
        default: 'default.jpeg'
    },
    link: String,
});

const Partner = new mongoose.model('Partner', partnerSchema);

module.exports = Partner;