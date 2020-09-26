const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    email: {
        type: String,
        required: true
    }, 
    feedback: {
        type: String
    }
});
 export const Feedback = mongoose.model('Feedback', feedbackSchema);