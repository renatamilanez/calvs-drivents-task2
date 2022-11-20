import { notFoundError, unauthorizedError } from "@/errors";
import { TicketEntity } from "@/repositories/protocols/Ticket";
import ticketRepository from "@/repositories/tickets-repository";

async function getTickets(userId: number) {
  const enrolledUser = await isUserEnrolled(userId);

  const hasTickets = await ticketRepository.getTickets(enrolledUser.id);
  if(!hasTickets) throw notFoundError();

  return hasTickets;
}

async function getTicketsTypes() {
  const ticketsTypes = await ticketRepository.getTicketsTypes();
  if(!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function postTickets(userId: number, ticketTypeId: number) {
  const enrolledUser = await isUserEnrolled(userId);

  const hasTicketType = await ticketRepository.getTicketTypeById(ticketTypeId);
  if(!hasTicketType) throw notFoundError();

  const ticket: TicketEntity = await ticketRepository.postTickets(enrolledUser.id, ticketTypeId);

  return {
    ...ticket,
    TicketType: hasTicketType
  };
}

async function isUserEnrolled(userId: number) {
  const hasUser = await ticketRepository.checkUserEnrollment(userId);

  if(!hasUser) throw unauthorizedError();

  return hasUser;
}

const ticketService = {
  getTickets,
  getTicketsTypes,
  postTickets
};

export default ticketService;
