const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
const port = 3001

app.use(bodyParser.json());

app.use('/api/pets', require('./routes/petRoute'));
app.use('/api/filterPets', require('./routes/petFilterRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/openai', require('./routes/openAIRoute'));
app.use('/api/txn', require('./routes/txnRoute'));
app.use('/api/trainPack', require('./routes/trainPackRoute'));
app.use('/api/cart', require('./routes/cartRoute'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors());