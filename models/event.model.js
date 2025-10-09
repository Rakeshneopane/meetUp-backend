const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required : true,
        enum: ["Online","Offline","Both"],
        default: "Both",
    },
    date:{
        type: Date,
        required: true,
    },
    timings: {
        type: String,
        require: true,
    },
    imageUrl:{
        type: String,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Event", EventSchema);