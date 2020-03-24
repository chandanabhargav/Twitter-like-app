let express = require('express')
    mongoose = require('mongoose')
    bodyParser =  require('body-parser')
    cors = require('cors')
    dbConfig = require('./database/db')

mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB')
}, error => {
    console.log('Error connecting to DB')
}); 

global.config = require('./config');

const app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
//app.use(bodyParser.json());
/* app.use(bodyParser.urlencoded({
    extended: false
})); */

app.use(cors());

var routes = require('./routes/route.js');

app.use('/', routes);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Listening on port ' + port)
});