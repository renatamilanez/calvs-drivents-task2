import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTickets, getTicketsTypes, postTickets } from "@/controllers";
import { ticketValidationSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketsTypes)
  .post("/", validateBody(ticketValidationSchema), postTickets);

export { ticketsRouter };
