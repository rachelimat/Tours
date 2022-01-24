const mongoose = require('mongoose'),
    id_validator = require('mongoose-id-validator');

var SiteSchema = new mongoose.Schema({
    site_id: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('invalid Index')
            }
        }
    },
    sitename: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    
    // tours: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tours' }],
}, { timestamps: true });
SiteSchema.plugin(id_validator);
const Site = mongoose.model('site', SiteSchema);

module.exports = Site