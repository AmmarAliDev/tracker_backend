const express = require('express')
const cors = require('cors')
const vehicleRoutes = require('./routes/vehicleRoutes')
const dbConnect = require('./config/db')

dbConnect()

const app = express()

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://vercel.live'],
        // Add other directives as needed
      },
    },
  })
)

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(express.json())

app.use(
  cors({
    origin: 'https://location-frontend-three.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
)

// Routes
app.use('/api/vehicles', vehicleRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Server Error', error: err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
