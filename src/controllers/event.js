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
            const { title, description, date, time, dressCode, price, maxAttendees, addr, city, country } = req.body;
    
            const newEvent = {
                title,
                description,
                address: {
                    addr,
                    city,
                    country,
                },
                date,
                time,
                dressCode,
                price,
                maxAttendees
            };
            const partyAddress = `${req.body.address}, ${req.body.city}, ${req.body.country}`;
            const locationData = geocoder.geocode(partyAddress);
            const createdEvent = await dbQuery.Create(event, newEvent);
            if (createdEvent) {
                createdEvent.location.coordinates = [locationData.longitude, locationData.latitude];

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
        try{
            const events = await event.find({});
            if (!events) {
                return res.status(400).json({ 
                   message: "Could not fetch events"
                });

            }
            return res.status(200).json({ 
                message: "Successfully fetched events",
                data: events
            });
        }catch (error) {
            res.status(500).json({message: err.message})
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
        const event = await event.findById(req.params.id);
        try{
            if (!event) {
                response.error(res, 400, 'Event does not exist')
            }
            return res.status(202).json({
                message: "Fetched event"
            });
        
        }catch (error) {
            res.status(500).json(err.message)
        }
        
    }
    
     /**
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {json} response
   * @memberof Event
   */
    static async getEventByCity (req, res) {
        try {
            const { city } = req.query;
            const events = await event.find({address: { city }});
            if(!events.length > 0) {
                res.status(401).json({
                    message: `No event found in ${city}`
                })
            }
            return res.status(200).json({
                message: `Found some events in ${city}`
            })
        } catch(error) {
            res.status(500).json({
               message: error.message 
            })

        }
        

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
                longitude, lattitude,
              } = req.query;
            const nearByEvents = await event.find({locationQuery(longitude, lattitude) });
            if (nearByEvents.length > 0) {
                  return response.status(200).json({
                    message: 'Found nearby events', 
                    nearByEvents 
                  });
              }
              return response.status(400).json({
                  message: 'There are no events in the area'
              })

        } catch (error) {
            return res.status(500).json({
                message: error.message 
            })
        }

    }

    
}

export default Event;

