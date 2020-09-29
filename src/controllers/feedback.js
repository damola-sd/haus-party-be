import feedback from "../models/Feedback";
const dbQuery = require("../utils/dbQueries");

class Feedback {
  static async createFeedback() {
    try {
      const { email, comment } = req.body;

      const newFeedback = await dbQuery.Create(feedback, {
        email,
        feedback: comment,
      });
      if (!newFeedback) {
        res.status(401).json("Could not create feedback");
      }
      res.status(201).json({
        message: "Succesfully added Feeback",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  static async getFeedbacks() {
    try {
        const allFeedback = await feedback.find({});
        if(allFeedback) {
            res.status(201).json({
                message: "Succesfully fetched feedbacks",
                data: allFeedback
              });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
  }
}

export default Feedback;
