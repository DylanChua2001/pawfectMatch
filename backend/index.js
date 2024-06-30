const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3001
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/pets', require('./routes/petRoute'));
app.use('/api/filterPets', require('./routes/petFilterRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/openai', require('./routes/openAIRoute'));
app.use('/api/chat', require('./routes/chatRoute'))
app.use('/api/favourites', require('./routes/favouritesRoute'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})