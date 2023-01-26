import WebPush from 'web-push';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';

// console.log(WebPush.generateVAPIDKeys()); // generate public/private keys

const publicKey =
  'BDAKXN4ausJOIaa5GwHbDyEjDHY01YOSwKiJXoenEiHZ9lrClAITurExxdJO0DicVxhAT5dYvszIEYds3bU0XP4';
const privateKey = 'DQ2PFEtMRylvBnR7cJN222rGzi60xNhxuUu2pUgwCmk';

WebPush.setVapidDetails('http://localhost:3000', publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return { publicKey };
  });

  app.post('/push/register', (_, reply) => {
    // todo: register client

    return reply.status(201).send();
  });

  app.post('/push/send', (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'hello world!');
    }, 5000);
    return reply.status(201).send();
  });
}
