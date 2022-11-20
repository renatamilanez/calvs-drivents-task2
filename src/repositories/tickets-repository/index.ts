import { prisma } from "@/config";
import { Ticket, TicketStatus } from "@prisma/client";

async function checkUserEnrollment(userId: number) {
  return prisma.enrollment.findUnique({
    where: {
      userId
    }
  });
}

async function getTickets(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: userId
    },
    include: {
      TicketType: true
    }
  });
}

async function getTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function getTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId
    }
  });
}

async function postTickets(enrollmentId: number, ticketTypeId: number) {
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
