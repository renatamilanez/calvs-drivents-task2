import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTickets, getTicketsTypes, postTickets } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/tickets", getTickets)
  .get("/tickets/types", getTicketsTypes)
  .post("/tickets", postTickets);

export { ticketsRouter };
