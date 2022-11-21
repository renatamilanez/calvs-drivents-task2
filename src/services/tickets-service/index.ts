import { notFoundError, unauthorizedError } from "@/errors";
import { TicketEntity } from "@/protocols/Ticket";
import ticketRepository from "@/repositories/tickets-repository";
import { Enrollment, Ticket, TicketType } from "@prisma/client";

async function getTickets(userId: number): Promise<Ticket> {
  const enrolledUser = await isUserEnrolled(userId);

  const hasTickets = await ticketRepository.getTickets(enrolledUser.id);
  if(!hasTickets) throw notFoundError();

  return hasTickets;
}

async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketRepository.getTicketsTypes();
  if(!ticketsTypes) throw notFoundError();

  return ticketsTypes;
}

async function postTickets(userId: number, ticketTypeId: number): Promise<{
	TicketType: TicketType;
	id: number;
	status: string;
	ticketTypeId: number;
	enrollmentId: number;
	createdAt: Date;
	updatedAt: Date;
}> {
  const enrolledUser = await isUserEnrolled(userId);

  const hasTicketType = await ticketRepository.getTicketTypeById(ticketTypeId);
  if(!hasTicketType) throw notFoundError();

  const ticket: TicketEntity = await ticketRepository.postTickets(enrolledUser.id, ticketTypeId);

  return {
    ...ticket,
    TicketType: hasTicketType
  };
}

async function isUserEnrolled(userId: number): Promise<Enrollment> {
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
