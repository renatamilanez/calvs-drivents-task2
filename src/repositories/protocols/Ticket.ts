export type TicketEntity = {
    id: number,
    status: string, //RESERVED | PAID
    ticketTypeId: number,
    enrollmentId: number,
    createdAt: Date,
    updatedAt: Date
}

export type Ticket = Omit<TicketEntity, "id" | "createdAt" | "updatedAt">

export type TicketType = {
    ticketTypeId: number
}
