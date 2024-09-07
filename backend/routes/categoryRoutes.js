import express from "express";
import categoryController from "../controllers/categoryController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", isAuthenticated, categoryController.createCategory);
categoryRouter.get("/", categoryController.fetchAllCategories);
categoryRouter.put("/:categoryId", isAuthenticated, categoryController.update);
categoryRouter.get("/:categoryId", categoryController.getCategory);
categoryRouter.delete("/:categoryId", isAuthenticated, categoryController.delete);

export default categoryRouter;