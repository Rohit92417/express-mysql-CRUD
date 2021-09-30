const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//Basic file CSS,image
app.use(express.static('public'));

// Configure template Engine and Main Template File
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
// Setting template Engine
app.set('view engine', 'hbs');

const routes = require("./server/routes/user");
app.use('/', routes);


const port = Number(process.env.PORT || 8000);

app.listen(port, () => console.log(`Listening on port ${port}`));
