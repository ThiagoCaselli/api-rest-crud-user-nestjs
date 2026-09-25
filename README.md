# TP4 - Sesiones de pago y webhook Stripe

Este repositorio contiene la integración de un microservicio HTTP desarrollado en NestJS que gestiona la creación de sesiones de pago con Stripe y procesa los eventos de confirmación mediante webhooks.

## ⚙️ Cómo levantar el proyecto

1. Instalar dependencias:
   Abre la terminal en la raíz del proyecto y ejecuta:
   npm install

2. Configuración de entorno:
   Copia el archivo .env.template y renómbralo a .env. 
   Completa las variables con tus credenciales de prueba de Stripe:
   
   PORT=3003
   STRIPE_SECRET=sk_test_...
   STRIPE_SUCCESS_URL=http://localhost:3003/payments/success
   STRIPE_CANCEL_URL=http://localhost:3003/payments/cancel
   STRIPE_ENDPOINT_SECRET=whsec_...

3. Iniciar el servidor:
   Ejecuta en tu terminal:
   npm run start:dev

4. Escuchar eventos del Webhook (Entorno local):
   Para interceptar los eventos de confirmación de pago, utiliza Stripe CLI ejecutando el siguiente comando:
   
   stripe listen --forward-to localhost:3003/payments/webhook --events charge.succeeded
   
   (Recuerda copiar el secreto whsec_... que imprime este comando y actualizar la variable STRIPE_ENDPOINT_SECRET en tu archivo .env).

## 🛣️ Rutas principales de la API

La aplicación expone los siguientes endpoints para cumplir con la consigna:

- POST /payments/create-payment-session
  Ruta encargada de crear la sesión de Checkout. Recibe un JSON validado con el identificador de la orden (orderId), la moneda y la lista de ítems. Devuelve la url de redirección de Stripe.

- POST /payments/webhook
  Endpoint para uso exclusivo de Stripe. Lee el cuerpo crudo (rawBody) de la petición y verifica la cabecera stripe-signature para validar la autenticidad del evento. Si se confirma el cobro (charge.succeeded), extrae la metadata y registra el orderId exitoso en consola.