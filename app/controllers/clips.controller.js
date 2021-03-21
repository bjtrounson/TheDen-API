const Clip = require('../models/clips.model.js');

exports.getClips = (req, res) => { 
    Clip.allClips((err, data) => { 
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        else res.send(data);
    })
}

exports.getClip = (req, res) => { 
    Clip.findClip(req.params.clipId, (err, data) => { 
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Clips with ID ${req.params.clipId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Clips with ID " + req.params.clipId
                });
            }
        } else res.send(data);
    })
}