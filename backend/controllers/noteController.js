const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')


// @decs Get note for a ticket
// @routes GET /api/tickets/:ticktId/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }

    const notes = await Note.find({ ticket: req.params.ticketId })

    res.status(200).json(notes)
})

// @decs create ticket note
// @routes post /api/tickets/:ticktId/notes
// @access private
const addNote = asyncHandler(async (req, res) => {
    // get user using the id in the json web token
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not Fuund')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not Authorized')
    }

    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    })

    res.status(200).json(note)
})

module.exports = {
    getNotes,
    addNote
}