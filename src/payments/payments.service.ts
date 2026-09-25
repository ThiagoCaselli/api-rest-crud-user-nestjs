import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET!, { apiVersion: '2026-08-26.dahlia' });
  private readonly logger = new Logger(PaymentsService.name);

  async createPaymentSession(dto: PaymentSessionDto) {
    const lineItems = dto.items.map((item) => ({
      price_data: {
        currency: dto.currency,
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Precio a centavos[cite: 1]
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: { metadata: { orderId: dto.orderId } }, // orderId en metadata[cite: 1]
      line_items: lineItems,
      mode: 'payment', //[cite: 1]
      success_url: process.env.STRIPE_SUCCESS_URL, //[cite: 1]
      cancel_url: process.env.STRIPE_CANCEL_URL, //[cite: 1]
    });

    return { id: session.id, url: session.url }; // Devuelve id y url[cite: 1]
  }

  async stripeWebhook(req: any, signature: string) {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        req['rawBody'], signature, process.env.STRIPE_ENDPOINT_SECRET! // Verifica firma con rawBody[cite: 1]
      );
    } catch (err) {
      throw new BadRequestException(`Firma inválida: ${err.message}`); // Responde 400 si falla[cite: 1]
    }

    if (event.type === 'charge.succeeded') {
      const charge = event.data.object as any;
      this.logger.log(`Cobro exitoso. Order ID: ${charge.metadata.orderId}`); // Extrae y loguea metadata.orderId[cite: 1]
    } else {
      this.logger.log(`Evento no manejado: ${event.type}`); // Loguea otros eventos[cite: 1]
    }

    return { received: true }; // Responde 200[cite: 1]
  }
}