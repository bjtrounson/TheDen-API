const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

require("./app/routes/logs.routes.js")(app);
require("./app/routes/channels.routes.js")(app);
require("./app/routes/clips.routes.js")(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});