import Joi from "joi";

export const ticketValidationSchema = Joi.object({
  ticketTypeId: Joi.number().required(),
});
