"use client";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "Realtime Notifications",
      description:
        "Send instant events to your users over WebSockets without managing connections. Perfect for alerts, messages, and live UI updates.",
    },
    {
      title: "User-Centric Delivery",
      description:
        "Events are scoped to individual users (UUID-based), ensuring precise delivery to the right recipient every time.",
    },
    {
      title: "HTTP → WebSocket Bridge",
      description:
        "Trigger events with a simple HTTP POST. Arifa handles routing and delivery, so your frontend or mobile app just listens.",
    },
    {
      title: "Reliable & Scalable",
      description:
        "Built for production: automatic reconnections, low-latency delivery, and infrastructure designed to handle high volumes of events.",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Arifa Does</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Arifa is a realtime event delivery platform that makes it simple to
          send notifications, counters, and live updates directly to users
          without managing sockets or infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="p-6 border border-border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
