const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  }, 
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
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

export const Event = mongoose.model('Event', eventSchema);