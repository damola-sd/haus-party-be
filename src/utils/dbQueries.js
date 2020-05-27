const response = require('./response');
const Boom = require('@hapi/boom');

module.exports = {
    GetOne: async (model, condition = {}) => {
        try {
            let result = await model.findOne(condition);
            return result;
        } catch (error) {
            return Promise.reject(Boom.notFound("Record not found."))
            
        }
    },
    Get: async (model, condition = {}) => {
        try {
            let result = await model.find(condition);
            return result;
        } catch (error) {
            throw Boom.notFound("Record not found.");
        }
    },
    Create: async (model, data) => {
        try {
            let result = await model.create(data);
            return result;
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    Edit: async (model, condition, data) => {
        try {

            let result = await model.findOneAndUpdate(condition,
                data, {
                upsert: true,
                new: true
            })
            return result;
        } catch (error) {
            throw response.error("Record not updated.");;
        }
    },

    Delete: async (model, _id) => {
        try {
            let result = await model.deleteOne({ _id });
            return result;
        } catch (error) {
            console.log(error);
            throw response.error("Record not deleted.");;
        }
    }
}