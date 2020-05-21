const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require(('slugify'));

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Donnez le nom de l\'employé'],
        trim: true
    },
    jobTitle: {
        type: String,
        required: [true, 'Quel est le poste de l\'employé'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'L\'email doit être valide.']
    },
    image: {
        type: String,
        default: 'default.jpg'
    },
    description : {
        type: String,
        required: [true, 'Donnez une description de l\'employé'],
        trim: true
    },
    status: {
        type: String,
        enum: ['hide', 'show'],
        default: 'hide'
    },
    slug: String
})

employeeSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {
        replacement: '_',
        lower: true
    });
    next();
});

const Employee = new mongoose.model('Employee', employeeSchema);

module.exports = Employee;