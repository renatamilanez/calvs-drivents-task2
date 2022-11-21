import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import { Card, Payment } from "@/protocols/Payment";

async function getPayments(userId: number, ticketId: number): Promise<Payment> {
  const hasTicket = await paymentRepository.checkData(ticketId);
  if(!hasTicket) throw notFoundError();

  const userData = await paymentRepository.checkData(ticketId);
  if(userData.Enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentRepository.getPayments(ticketId);
  if(!payment) throw notFoundError();

  return payment;
}

async function postPayment(ticketId: number, cardData: Card, userId: number): Promise<Payment> {
  const ticketData = await paymentRepository.checkData(ticketId);
  if(!ticketData) throw notFoundError();

  const userData = await paymentRepository.checkData(ticketId);
  if(userData.Enrollment.userId !== userId) throw unauthorizedError();

  const ticketPrice = await paymentRepository.getPaymentValue(ticketId);

  const newPaymentData = {
    ticketId,
    value: ticketPrice.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: String(cardData.number).slice(-4),
  };
    
  const payment: Payment = await paymentRepository.processPayment(newPaymentData);
  await paymentRepository.updateStatusTicket(ticketId);

  return payment;
}

const paymentsService = {
  getPayments,
  postPayment
};

export default paymentsService;
