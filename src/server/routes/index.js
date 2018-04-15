import express from "express";
import indexCtrl from "../controllers";
import apiCtrl from "../controllers/api";

const router = express.Router();

router.route("/").get(indexCtrl.homePage);
router.route("/api/getCalenderData").get(apiCtrl.getCalenderData);
router.route("/api/addToCalendar").post(apiCtrl.addToCalendar);


export default router;
