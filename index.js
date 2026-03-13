const express = require('express')
const connectToMongo = require('./db.js')
const app = express()
const port = 5000

connectToMongo();

app.use(express.json())

// Availabe Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
