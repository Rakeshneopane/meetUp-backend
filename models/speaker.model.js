const mongoose = require("mongoose");

const SpeakerInfoSchema = new mongoose.Schema({
    speakerName: String,
    speakerImg: String,  
    speakerRole: String,   
},{
    timestamps: true,
});

module.exports = mongoose.model("SpeakerInfo", SpeakerInfoSchema);