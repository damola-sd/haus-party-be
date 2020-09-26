const router = require("express").Router();
import Event from "../controllers/event";
import checkUserIsAuthenticated from "../middlewares/checkUserIsAuthenticated";

import checkUserIsAdmin from "../middlewares/checkUserIsAdmin";

// import {} from "../middlewares/";

const {
  createEvent,
  getEvent,
  getEvents,
  getEventByCity,
  getNearByEvents,
} = Event;


router.post("/create", checkUserIsAuthenticated, checkUserIsAdmin, createEvent);
router.get("/all", checkUserIsAuthenticated, getEvents);
router.get("/:id", checkUserIsAuthenticated, getEvent);
router.get("/nearby", checkUserIsAuthenticated, getNearByEvents, getEventByCity);

module.exports = router;