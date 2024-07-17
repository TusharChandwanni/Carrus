import express from 'express';
import { getAllJobs ,getmyJobs,postJob, updatejob,deleteJob,getSingleJob} from '../controllers/jobController.js';
import {isAuthorized} from "../middleware/auth.js";

const router=express.Router();
router.get("/getall",getAllJobs);
router.post("/post",isAuthorized,postJob);
router.get("/getmyjobs",isAuthorized,getmyJobs);
router.put("/update/:id",isAuthorized,updatejob);
router.delete("/delete/:id", isAuthorized, deleteJob);
router.get("/:id", isAuthorized, getSingleJob);

export default router;