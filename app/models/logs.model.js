const sql = require("./db.js");

const Logs = function (logs) {
    this.displayName = logs.displayName;
    this.channelName = logs.channelName;
    this.dateSent = logs.dateSent;
    this.message = logs.message;
};
 
Logs.userLogs = (logsDisplayName, result) => {
    sql.query({
        sql: 'SELECT `display_name`, b.`channel_name`, `date_sent`, `message` FROM `messages` a JOIN `channels` b ON a.`channel_id` = b.`id` WHERE display_name = ? ORDER BY `date_sent` DESC',
        timeout: 40000,
    }, [logsDisplayName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found logs: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Logs;