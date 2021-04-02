var corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Accept'],
    methods: ["GET","HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 200
}

module.exports = app => {
    const clip = require("../controllers/clips.controller.js");

    app.get("/clips", clip.getClips)
    app.get("/clips/id/:clipId", clip.getClip)
    app.post("/clips", clip.addClip)
};