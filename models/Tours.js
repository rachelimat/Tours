const mongoose = require('mongoose')
const id_validator = require ('mongoose-id-validator');

var ToursSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('invalid id')
            }
        }
    },
    start_date: {
        type: Date,
        "default":Date.now, 
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('invalid duration')
            }
        }
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('invalid price')
            }
        }
    },
    cupon:[{code: Number, percent: Number, start_date: Date, end_date: Date}],
    site: [{ type: mongoose.Schema.Types.ObjectId, ref: 'site' }],
}, { timestamps: true });
ToursSchema.plugin(id_validator);//chack if the id_validator are exist 
// TaskSchema.index("completed");

const Tours = mongoose.model('Tours', ToursSchema);


module.exports = Tours