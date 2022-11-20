import { notFoundError } from "@/errors";
import { TicketEntity } from "@/repositories/protocols/Ticket";
import ticketRepository from "@/repositories/tickets-repository";

async function getTickets(userId: number) {
  const hasUser = await ticketRepository.checkUserEnrollment(userId);

  if(!hasUser) throw notFoundError();

  const hasTickets = await ticketRepository.getTickets(hasUser.id);

  if(!hasTickets) throw notFoundError();

  return hasTickets;
}

async function getTicketsTypes() {
  const ticketsTypes = await ticketRepository.getTicketsTypes();
  if(!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function postTickets(userId: number, ticketTypeId: number) {
  const hasTicketType = await ticketRepository.getTicketTypeById(ticketTypeId);
  if(!hasTicketType) throw notFoundError();

  const hasUser = await ticketRepository.checkUserEnrollment(userId);
  if(!hasUser) throw notFoundError();

  const ticket: TicketEntity = await ticketRepository.postTickets(hasUser.id, ticketTypeId);

  return {
    ...ticket,
    TicketTyp: hasTicketType
  };
}

const ticketService = {
  getTickets,
  getTicketsTypes,
  postTickets
};

export default ticketService;
