import { Controller, Post, Get, Body, Req, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() dto: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(dto); //[cite: 1]
  }

  @Get('success')
  success() {
    return { ok: true, message: 'Payment successful' }; // Respuesta sugerida[cite: 1]
  }

  @Get('cancel')
  cancel() {
    return { ok: false, message: 'Payment cancelled' }; // Respuesta sugerida[cite: 1]
  }

  @Post('webhook')
  stripeWebhook(@Req() req: any, @Headers('stripe-signature') signature: string) {
    return this.paymentsService.stripeWebhook(req, signature); //[cite: 1]
  }
}
