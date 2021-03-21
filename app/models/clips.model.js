const sql = require("./db.js");

const Clips = function (clip) {
    this.id = clip.id;
    this.title = clip.title;
    this.broadcasterName = clip.broadcasterName;
    this.creatorName = clip.creatorName;
    this.createdAt = clip.createdAt;
    this.thumbnailUrl = clip.thumbnailUrl;
    this.clipUrl = clip.clipUrl;
    this.mp4Url = clip.mp4Url;
    this.videoId = clip.videoId;
    this.clipId = clip.clipId;
};

Clips.allClips = result => {
    sql.query({
        sql: 'SELECT * FROM `clips`',
        timeout: 40000
    }, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("clips: ", res);
        result(null, res);
    });
};

Clips.findClip = (clipId, result) => {
    sql.query({
        sql: 'SELECT * FROM `clips` WHERE clip_id = ?',
        timeout: 40000
    }, [clipId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found clip: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

module.exports = Clips;