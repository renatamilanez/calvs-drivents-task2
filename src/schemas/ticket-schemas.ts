import { TicketType } from "@prisma/client";
import Joi from "joi";

export const ticketValidationSchema = Joi.number().required();
