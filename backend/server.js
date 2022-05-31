// Entry point
const path = require('path')
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const exp = require('constants');
const PORT = process.env.PORT || 8000




connectDB()

const app = express();

app.use(express.json());

//Return Value: It returns an Object
app.use(express.urlencoded({ extended: false }))

//Routes
//this route is connected to userRoutes.js
app.use('/api/users', require('./routes/userRoutes'))

//this route is connected to ticketRoutes.js & noteRoutes.js
app.use('/api/tickets', require('./routes/ticketRoutes'))


// Serve FrontEnd
if (process.env.NODE_ENV === 'production') {
    //set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}
else {
    //root URL (welcome page)
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'welcome to the API' })
    })
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started at port ${PORT}`));

