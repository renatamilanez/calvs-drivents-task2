import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";
import { Payment } from "../protocols/Payment";

async function getPayments(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    }
  });
}

async function checkData(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true
    }
  });
}

async function processPayment(newPaymentData: Payment) {
  return prisma.payment.create({
    data: {
      ...newPaymentData
    }
  });
}

async function updateStatusTicket(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: TicketStatus.PAID
    }
  });
}

async function getPaymentValue(ticketId: number) {
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
