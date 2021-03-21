module.exports = app => {
    const clip = require("../controllers/clips.controller.js");

    app.get("/clips", clip.getClips)
    app.get("/clips/id/:clipId", clip.getClip)
};