const dbQuery = require('../utils/dbQueries');
const response = require('../utils/response');
const locationQuery = require('../utils/locationQuery');
const event = require('../models/Event');
const NodeGeoCoder = require('node-geocoder');

const options = {
    provider: 'google',

    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_KEY,
    formatter: null
};
let geocoder = NodeGeoCoder(options);

/**
 * @class Event
 */
class Event {
     /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   * @memberof Event
   */
    static async createEvent(req, res) {
        try {
            const { title, description, date, time, dressCode, price, maxAttendees, address, city, country } = req.body;
    
            const newEvent = {
                title,
                description,
                location: {
                    address,
                    city,
                    country,
                },
                date,
                time,
                dressCode,
                price,
                maxAttendees
            };
            const address = `${req.body.address}, ${req.body.city}, ${req.body.country}`;
            const locationData = geocoder.geocode(address);
            const createdEvent = await dbQuery.Create(event, newEvent);
            if (createdEvent) {
                createdEvent.location.latitude = locationData.latitude;
                createdEvent.location.longitude = locationData.longitude;
                createdEvent.save().then((event, error) => {
                    if (error) response.error(500, `Error: ${error.message}`)
                    response.success(res, 200, event);
                })
            }
            res.status(401).json({message: 'Could not create event'});
    
        } catch (error) {
            throw error
        }
    }
    
     /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   * @memberof Event
   */
    static async getEvents(req, res) {
        const events = await Event.find({});
        if (events) {
            return response.success(res, 200, events);
        }
    }
    
     /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   * @memberof Event
   */
    static async getEvent (req, res) {
        const event = await Event.findById(req.params.id);
        if (!event) {
            response.error(res, 400, 'Event does not exist')
        }
        response.success(res, 200, event);
    }
    
     /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   * @memberof Event
   */
    static async getEventByCity (req, res) {
    
        const events = await Event.find()
    }
    
     /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   * @memberof Event
   */

    static async getNearByEvents (req, res) {
        try {
            const {
                longitude, lattitude, page, limit,
              } = req.query;
              const nearByEvents = await event.find({locationQuery(longitude, lattitude) });
              if (nearByEvents.length > 0) {
                  return response.status(200).json({
                    message: 'Found nearby events', 
                    nearByEvents 
                  });
              }
              response.status(400).json({
                  message: 'There are no events in the area'
              })

        } catch (error) {
            return res.status(500).json({
                message: error.message 
            })
        }

    }

    
}
