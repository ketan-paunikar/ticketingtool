const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// @decs Get User tickets
// @routes GET /api/tickets/
// @access private
const getTickets = asyncHandler(async (req, res) => {
    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const tickets = await Ticket.find({ user: req.user.id })
    res.status(200).json(tickets)
})

// @decs Get User ticket
// @routes GET /api/tickets/:id
// @access private
const getTicket = asyncHandler(async (req, res) => {
    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not Found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized!')
    }

    res.status(200).json(ticket)
})


// @decs Create new tickets
// @routes POST /api/tickets/
// @access private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @decs delete ticket
// @routes delete /api/tickets/:id
// @access private
const deleteTicket = asyncHandler(async (req, res) => {
    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not Found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized!')
    }

    await ticket.remove()

    res.status(200).json({ success: true })
})

// @decs Updateticket
// @routes PUT /api/tickets/:id
// @access private
const updateTicket = asyncHandler(async (req, res) => {
    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not Found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized!')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}