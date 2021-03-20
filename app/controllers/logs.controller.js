const Logs = require("../models/logs.model.js");

exports.userLogs = (req, res) => { 
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
        } else res.send(data);
    });
}