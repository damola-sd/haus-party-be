const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// import { addressSchema } from './Address';

const updateSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    }, 
    image: {
      type: String
    }, 
    datePosted: {
      type: Date
    }
  }
);

const attendeeSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String
  }
});

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [],
  },
});

export const addressSchema = new Schema({
  address: {
      type: String,
       
  },
  city: {
      type: String,
  },
  country: {
      type: String,
  }
})

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: pointSchema,
    required: true
  },
  address: addressSchema,
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    }
  ],
  dressCode: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  maxAttendees: {
    type: Number,
    required: true
  },
  attendees: [ attendeeSchema ],
  updates: [ updateSchema ]
});

// export const Event = mongoose.model('event', eventSchema);
module.exports =  mongoose.model('event', eventSchema)