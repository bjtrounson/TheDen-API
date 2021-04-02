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

exports.addClip = (req, res) => { 
    // Validate request
    res.setHeader('Access-Control-Allow-Origin', '*')
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else { 
        const clip = new Clip({
            title: req.body.title,
            broadcaster_name: req.body.broadcaster_name,
            creator_name: req.body.creator_name,
            created_at: req.body.created_at,
            thumbnail_url: req.body.thumbnail_url,
            clip_url: req.body.clip_url,
            mp4_url: req.body.mp4_url,
            video_id: req.body.video_id,
            clip_id: req.body.clip_id
        });

        // Save Customer in the database
        Clip.addClip(clip, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding Clip."
                });
            else { 
                Clip.saveClip(req.body.clip_id, req.body.mp4_url, req.body.thumbnail_url)
                res.send(data);
            }
        });
    }
}