const sql = require("./db.js");

const Clip = function (clip) {
    this.id = clip.id;
    this.title = clip.title;
    this.broadcaster_name = clip.broadcaster_name;
    this.creator_name = clip.creator_name;
    this.created_at = clip.created_at;
    this.thumbnail_url = clip.thumbnail_url;
    this.clip_url = clip.clip_url;
    this.mp4_url = clip.mp4_url;
    this.video_id = clip.video_id;
    this.clip_id = clip.clip_id;
};

Clip.allClips = result => {
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

Clip.findClip = (clipId, result) => {
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

Clip.addClip = async (newClip, result) => { 
    sql.query({
        sql: 'INSERT INTO clips SET ?',
        timeout: 40000
    }, [newClip], (err, res) => { 
            if (err) { 
                console.log("error", err);
                result(err, null);
                return;
            }

            console.log("add clip", { id: res.insertId, ...newClip })
            result(null, { id: res.insertId, ...newClip })
    })
}

Clip.saveClip = async (clipId, mp4Url, thumbUrl) => { 
    const fetch = require('node-fetch');
    const fs = require('fs');
    
    const videoResponse = await fetch(mp4Url);
    const videoBuffer = await videoResponse.buffer();

    const imageResponse = await fetch(thumbUrl);
    const imageBuffer = await imageResponse.buffer();

    await fs.writeFile(`public/video/${clipId}.mp4`, videoBuffer, () => 
        console.log(`finished downloading video!`));
    
    await fs.writeFile(`public/image/${clipId}.jpg`, imageBuffer, () => 
        console.log(`finished downloading image!`));
}

module.exports = Clip;