const mongoose = require("mongoose");

const EventInfoSchema = new mongoose.Schema({
   
    eventInfo: [{
        type: String,
        required:true,
    }],
    details:String,    
    speakers: [String],
    pricing:{
        type: String,
        default: "Free",
    },
    venue: {
        type: String,
        required: true,
    },
    dressCode: String,
    age: String,
    tags: [String],
     eventTitle:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("EventInfo", EventInfoSchema);