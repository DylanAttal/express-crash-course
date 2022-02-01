const express = require('express')
const path = require('path')
const logger = require('./middleware/logger')

const app = express()

// Init middleware
app.use(logger)

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API routes
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 3003

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
