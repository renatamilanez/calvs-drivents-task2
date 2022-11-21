import { prisma } from "@/config";
import { TicketStatus, Enrollment, Ticket, TicketType } from "@prisma/client";

async function checkUserEnrollment(userId: number): Promise<Enrollment> {
  return prisma.enrollment.findUnique({
    where: {
      userId
    }
  });
}

async function getTickets(userId: number): Promise<Ticket & {
	TicketType: TicketType;
}> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: userId
    },
    include: {
      TicketType: true
    }
  });
}

async function getTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function getTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

async function postTickets(enrollmentId: number, ticketTypeId: number): Promise<Ticket> {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED
    }
  });
}

const ticketRepository = {
  checkUserEnrollment,
  getTickets,
  getTicketsTypes,
  getTicketTypeById,
  postTickets
};

export default ticketRepository;
