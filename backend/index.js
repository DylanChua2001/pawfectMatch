const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3001
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use('/api/pets', require('./routes/petRoute'));
app.use('/api/filterPets', require('./routes/petFilterRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/openai', require('./routes/openAIRoute'));
app.use('/api/txn', require('./routes/txnRoute'));
app.use('/api/trainPack', require('./routes/trainPackRoute'));
app.use('/api/cart', require('./routes/cartRoute'));
app.use('/api/chat', require('./routes/chatRoute'))
app.use('/api/favourites', require('./routes/favouritesRoute'))
app.use('/api/match', require('./routes/matchRoute'))
app.use('/api/auth',require('./routes/authRoute'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

