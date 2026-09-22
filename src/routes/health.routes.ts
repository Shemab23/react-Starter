import { Router } from "express";
import { successResponse } from "../utils/api-response.js";

const router = Router();

router.get("/", (req, res) => {
  successResponse(res, {
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
