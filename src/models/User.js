const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true
        },
        firstName: {
            type: String,
            trim: true,
            required: 'You must have a first name'
          },
          lastName: {
            type: String,
            trim: true,
            required: 'You must have a last name'
          },
          phoneNumber: {
            type: String,
            trim: true
          },
          email: {
            type: String,
            trim: true,
            unique: true,
            required: 'You must have an email'
          },
          password: {
            type: String,
            // required: 'You need a password', Pass
            minlength: 8
          },
          dateOfBirth: {
            type: Date
          },
          profilePicture: {
              type: String,
              trim: true
          },
          role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer'
          },
          facebook: {
              type: String,
              trim: true
          }, 
          instagram: { 
              type: String,
              trim: true
          },
          twitter: { 
            type: String,
            trim: true
        }
    }
);

export const User = mongoose.model('User', userSchema);