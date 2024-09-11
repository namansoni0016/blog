import asyncHandler from "express-async-handler";
import Plan from "../models/Plan.js";

const planController = {
    //create plan
    createPlan: asyncHandler(async (req, res) => {
        const { planName, features, price, limitation } = req.body;
        //check if plan exists
        const planFound = await Plan.findOne({ planName });
        if(planFound) {
            throw new Error("Plan already Exists");
        }
        // check if total plans are two
        const planCount = await Plan.countDocuments();
        if(planCount >= 2) {
            throw new Error('You cannot add more than two plans');
        }
        //creating the plan
        const planCreated = await Plan.create({
            planName,
            features,
            price,
            limitation,
            user: req.user,
        });
        res.json({
            status: "success",
            message: "Plan created successfully!",
            planCreated,
        });
    }),
    //list all plans
    fetchAllPlans: asyncHandler(async (req, res) => {
        const plans = await Plan.find();
        res.json({
            status: "success",
            message: "Plans fetched successfully!",
            plans,
        });
    }),
    //get a single plan
    getPlan: asyncHandler(async (req, res) => {
        //get the plan id from params
        const planId = req.params.planId;
        //find the plan
        const planFound = await Plan.findById(planId);
        res.json({
            status: "success",
            message: "Plan fetched successfully",
            planFound,
        });
    }),
    //delete a category
    delete: asyncHandler(async (req, res ) => {
        const planId = req.params.planId;
        await Plan.findByIdAndDelete(planId);
        res.json({
            status: "success",
            message: "Plan deleted successfully!",
        });
    }),
    //updating the plan
    update: asyncHandler( async(req, res) => {
        const planId = req.params.planId;
        const planFound = await Plan.findById(planId);
        if(!planFound) {
            throw new Error("Category not found!");
        }
        const planUpdated = await Plan.findByIdAndUpdate(
            planId,
            {   
                planName: req.body.planName, 
                features: req.body.features,
                price: req.body.price,
                limitation: req.body.limitation,
            },
            { new: true }
        );
        res.json({
            status: "success",
            message: "Plan updated successfully!",
            planUpdated,
        });
    }),
}

export default planController; 