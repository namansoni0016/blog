import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import planController from "../controllers/planController.js";

const planRouter = express.Router();

planRouter.post("/create", isAuthenticated, planController.createPlan);
planRouter.get("/", planController.fetchAllPlans);
planRouter.put("/:categoryId", isAuthenticated, planController.update);
planRouter.get("/:categoryId", planController.getPlan);
planRouter.delete("/:categoryId", isAuthenticated, planController.delete);

export default planRouter;