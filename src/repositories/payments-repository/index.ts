import { prisma } from "@/config";
import { Enrollment, Ticket, TicketStatus, TicketType } from "@prisma/client";
import { Payment } from "../../protocols/Payment";

async function getPayments(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

async function checkData(ticketId: number): Promise<Ticket & {Enrollment: Enrollment}> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true
    }
  });
}

async function processPayment(newPaymentData: Payment): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ...newPaymentData
    }
  });
}

async function updateStatusTicket(ticketId: number): Promise<Ticket> {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: TicketStatus.PAID
    }
  });
}

async function getPaymentValue(ticketId: number): Promise<Ticket & {
	TicketType: TicketType;
}> {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
}

const paymentsRepository = {
  getPayments,
  checkData,
  processPayment,
  updateStatusTicket,
  getPaymentValue
};

export default paymentsRepository;
