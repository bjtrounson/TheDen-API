const Channel = require('../models/channels.model.js');

exports.getChannels = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    Channel.allChannels((err, data) => { 
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        else res.send(data);
    })
}