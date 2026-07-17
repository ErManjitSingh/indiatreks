import { Router } from "express";
import * as searchController from "../controllers/search.controller";
import { validate } from "../middlewares/validate";
import { searchQuerySchema } from "../validators/search.validator";

const router = Router();

router.get("/", validate(searchQuerySchema, "query"), searchController.globalSearch);
router.get("/autocomplete", validate(searchQuerySchema, "query"), searchController.autocomplete);
router.get("/suggestions", validate(searchQuerySchema, "query"), searchController.suggestions);
router.get("/popular", searchController.popularSearches);
router.get("/trending", searchController.trendingSearches);

export default router;
