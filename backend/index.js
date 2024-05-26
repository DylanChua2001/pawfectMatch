const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.json());

app.use('/api/pets', require('./routes/petRoute'));
app.use('/api/filterPets', require('./routes/petFilterRoute'));
app.use('/api/users', require('./routes/userRoute'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})