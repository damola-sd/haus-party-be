const router = require("express").Router();
import Feedback from "../controllers/feedback";
import checkUserIsAuthenticated from "../middlewares/checkUserIsAuthenticated";

import checkUserIsAdmin from "../middlewares/checkUserIsAdmin";

const {
    createFeedback, getFeedbacks
  } = Feedback;

router.post("/create", createFeedback);
router.get("/all", checkUserIsAdmin, getFeedbacks);


module.exports = router;