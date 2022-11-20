import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken);

export { paymentsRouter };
