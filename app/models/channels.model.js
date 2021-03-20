const sql = require("./db.js");

const Channel = function (channel) {
    this.id = channel.id;
    this.name = channel.name;
};

Channel.allChannels = result => {
    sql.query({
        sql: 'SELECT * FROM `channels`',
        timeout: 40000
    }, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("channels: ", res);
        result(null, res);
    });
};

module.exports = Channel;