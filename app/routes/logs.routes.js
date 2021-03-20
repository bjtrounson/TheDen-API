module.exports = app => {
    const logs = require("../controllers/logs.controller.js");

    app.get("/logs/:logsDisplayName", logs.userLogs)
};