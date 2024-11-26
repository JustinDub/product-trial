const app = require('./app')
const db = require('./config/database')
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})