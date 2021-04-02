const express = require('express');
const bodyParser = require('body-parser');
var serveStatic = require('serve-static')
var path = require('path');
var cors = require('cors')

const app = express();
const port = 4000
const host = '0.0.0.0'

app.use(bodyParser.json())
app.use(serveStatic(path.join(__dirname, 'public')))

require("./app/routes/logs.routes.js")(app);
require("./app/routes/channels.routes.js")(app);
require("./app/routes/clips.routes.js")(app);

app.options('/clips', cors())
app.options('/logs', cors())
app.options('/channels', cors())

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});