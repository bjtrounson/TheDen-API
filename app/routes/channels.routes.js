module.exports = app => {
    const channel = require("../controllers/channels.controller.js");

    app.get("/channels", channel.getChannels)
};