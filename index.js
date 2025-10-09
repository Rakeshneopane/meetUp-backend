const express = require("express");

const cors = require("cors");

// const corsOptions = {
//   origin: "*",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

const app = express();

app.use(express.json());
app.use(cors());

const { initialiseDatabase } = require("./db/dbConnect");

initialiseDatabase();

const Event = require("./models/event.model") 
const EventInfo = require("./models/eventInfo.model");

const PORT = 3000;

app.get("/",(req,res)=>{
    res.send("Meetup Api is working!")
});

app.listen(PORT, ()=>{
    console.log("Server running on port: ",PORT);
});

const createEvent = async (event)=>{
    try {
        const newEvent = new Event(event);
        const saveEvent = await newEvent.save();
        return saveEvent;
    } catch (error) {
        console.log("Failed to create event.", error);
        throw error;
    }
};

app.post("/event", async(req,res)=>{
    try {
        const { event, eventType, date, timings } = req.body;

        if(!event || !eventType || !date || !timings){
            res.status(400).json({error: "Event, type,date and timings are required."})
        }
        else{
            const savedEvent = await createEvent(req.body);
            res.status(201).json({message: "Event created successfully", event: savedEvent});
        }        
    } catch (error) {
        res.status(500).json({error: "Failed to fetch create route"});
        throw error;
    }
});

const createEventInfo = async (eventInfo)=>{
    try {
        const newEventInfo = new EventInfo(eventInfo);
        const saveEventInfo = await newEventInfo.save();
        return saveEventInfo;
    } catch (error) {
        console.log("Failed to create event info", error);
        throw error;        
    }
};

app.post("/eventInfo", async( req,res)=>{
    try {
        const {eventTitle,venue} = req.body;
        if(!eventTitle || !venue){
            res.status(400).json({error: "Event information and venue are required"})
        }
        else{
            const savedEventInfo = await createEventInfo(req.body);
            res.status(201).json({message: "Event information add successfully", eventInfo : savedEventInfo});
        }     
    } catch (error) {
        res.status(500).json({error: "Failed to create event info."})
        throw error;        
    }
});

const getAllEvents = async()=>{
    try {
        const allEventInfos = await EventInfo.find().populate("eventTitle");
        return allEventInfos;
    } catch (error) {
        console.log("Cannot get the events", error);        
        throw error;
    }
};

app.get("/events", async(req,res)=>{
    try {
        const events = await getAllEvents();
        if(events.length > 0){
            res.status(200).json(events);
        }
        else{
            res.status(400).json({error: "Events not found."})
        }
        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the events."})
        throw error;        
    }
});

const getEventById = async(eventId)=>{
    try {
        const event = await Event.findById(eventId);
        return event;        
    } catch (error) {
         console.log("Cannot find the event", error);        
        throw error;
    }
};

app.get("/event/:id", async(req,res)=>{
    try {
        const event = await getEventById(req.params.id);
        if (event){
            res.status(200).json(event);
        }
        else{
            res.status(404).json({error: "Event not found."});
        }        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the event by name."})
    }
});

const getEventByName = async(eventName)=>{
    try {
        const event = await Event.findOne({event: eventName});
        return event;        
    } catch (error) {
         console.log("Cannot find the event", error);        
        throw error;
    }
};

app.get("/event/name/:name", async(req,res)=>{
    try {
        const event = await getEventByName(req.params.name);
        if (event){
            res.status(200).json(event);
        }
        else{
            res.status(404).json({error: "Event not found."});
        }        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the event by name."})
    }
});

const getEventByType = async(eventType)=>{
    try {
        const event = await Event.find({eventType});
        return event;        
    } catch (error) {
         console.log("Cannot find the event", error);        
        throw error;
    }
};

app.get("/eventByType/:type", async(req,res)=>{
    try {
        const event = await getEventByType(req.params.type);
        if (event.length > 0){
            res.status(200).json(event);
        }
        else{
            res.status(404).json({error: "Event not found."});
        }        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the event by type."})
    }
});

const updateEventById = async(eventId,dataToUpdate)=>{
    try {
        const event = await Event.findByIdAndUpdate(eventId,dataToUpdate,{new: true});
        return event;        
    } catch (error) {
         console.log("Cannot find the event", error);        
        throw error;
    }
};

app.post("/updateEventById/:id", async(req,res)=>{
    try {
        
        const event = await updateEventById(req.params.id, req.body);
        if (event){
            res.status(200).json(event);
        }
        else{
            res.status(404).json({error: "Event not found."});
        }        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the event by type."})
    }
});

const updateEventInfoById = async(eventId,dataToUpdate)=>{
    try {
        const event = await EventInfo.findByIdAndUpdate(eventId,dataToUpdate,{new: true});
        return event;        
    } catch (error) {
         console.log("Cannot find the event", error);        
        throw error;
    }
};

app.post("/updateEventInfoById/:id", async(req,res)=>{
    try {
        
        const event = await updateEventInfoById(req.params.id, req.body);
        if (event){
            res.status(200).json(event);
        }
        else{
            res.status(404).json({error: "Event not found."});
        }        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the event by type."})
    }
});

const deleteEventById = async(eventId)=>{
    try {
        const eventInfo = await EventInfo.deleteMany({eventTitle: eventId});
        const event = await Event.findByIdAndDelete(eventId);
        return event;        
    } catch (error) {
         console.log("Cannot find the event", error);        
        throw error;
    }
};

app.delete("/deleteEventById/:id", async(req,res)=>{
    try {        
        const event = await deleteEventById(req.params.id);
        if (event){
            res.status(200).json({message: "Event and its info deleted successfully", event: event});
        }
        else{
            res.status(404).json({error: "Event not found."});
        }        
    } catch (error) {
        res.status(500).json({error: "Cannot fetch the event by type."})
    }
});
