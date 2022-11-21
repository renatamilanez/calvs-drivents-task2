export type Card = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
};

export type PaymentEntity = {
    id: number,
    ticketId: number,
    value: number,
    cardIssuer: string, // VISA | MASTERCARD
    cardLastDigits: string,
    createdAt: Date,
    updatedAt: Date,
}

export type Payment = Omit<PaymentEntity, "id" | "createdAt" | "updatedAt">;

export type CardData = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
};
