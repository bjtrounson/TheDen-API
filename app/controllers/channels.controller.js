const Channel = require('../models/channels.model.js');

exports.getChannels = (req, res) => { 
    Channel.allChannels((err, data) => { 
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        else res.send(data);
    })
}