const dbQuery = require('../utils/dbQueries');
const response = require('../utils/response');
const Event = require('../models/Event');
const NodeGeoCoder = require('node-geocoder');

const options = {
    provider: 'google',

    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_KEY,
    formatter: null
};
let geocoder = NodeGeoCoder(options);

export const createEvent = async (req, res) => {
    try {
        const event = {
            title: req.body.title,
            description: req.body.description,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            date: req.body.date,
            time: req.body.time,
            dressCode: req.body.dressCode,
            price: req.body.price,
            maxAttendees: req.body.maxAttendees
        };
        const address = `${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.country}`
        const newEvent = await dbQuery.Create(Event, event);
        if (newEvent) {
            const locationData = geocoder.geocode(address);
            newEvent.latitude = locationData.latitude;
            newEvent.longitude = locationData.longitude;
            newEvent.save().then((event, error) => {
                if (error) response.error(500, `Error: ${error.message}`)
                response.success(res, 200, event);
            })
        }

    } catch (error) {
        throw error
    }
}

export const getEvents = async (req, res) => {
    const events = await Event.find({});
    if (events) {
        return response.success(res, 200, events);
    }
}

export const getEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) {
        response.error(res, 400, 'Event does not exist')
    }
    response.success(res, 200, event);
}