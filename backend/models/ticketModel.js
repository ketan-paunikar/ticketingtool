const mongoose = require('mongoose')


const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: String,
            required: [true, 'please select a Product'],
            enum: ['Samsung', 'iPhone', 'Pixel', 'Macbook Pro', 'iPod', 'Laptop']
        },
        description: {
            type: String,
            required: [true, 'please enter a description of the issue']
        },
        status: {
            type: String,
            required: true,
            enum: ['new', 'open', 'closed'],
            default: 'new',
        }
    },
    {
        timeStamps: true,
    })


module.exports = mongoose.model('Ticket', ticketSchema)