import userRoutes from "../routes/user";
import eventRouters from "../routes/event";
// import cardRouters from '../routes/card';
import feedbackRouters from "../routes/feedback";
const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Testing out the initroutes function");
});
router.use("/user", userRoutes);
router.use("/event", eventRouters);
router.use("/card", userRoutes);
router.use("/feedback", feedbackRouters);



module.exports = router;