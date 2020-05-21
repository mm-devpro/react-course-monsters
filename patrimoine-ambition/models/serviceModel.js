const mongoose = require('mongoose');
const slugify = require('slugify');


const serviceSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Chaque service doit avoir un titre'],
            unique: true,
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Chaque service doit avoir une description'],
            trim: true,
        },
        slug: String,
        image: {
            type: String,
            default: 'default.jpeg'
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    });

serviceSchema.pre('save', function (next) {
    this.slug = slugify(this.title, {lower: true});
    next();
});




const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;