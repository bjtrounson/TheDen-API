const Logs = require("../models/logs.model.js");

exports.userLogs = (req, res) => {
    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    res.setHeader('Access-Control-Allow-Origin', '*')
    Logs.userLogs(req.params.logsDisplayName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Logs with Username ${req.params.logsDisplayName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Logs with Username " + req.params.logsDisplayName
                });
            }
        } else {
            const resultData = data.slice(startIndex, endIndex)
            res.send(resultData);
        } 
    });
}