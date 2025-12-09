"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export default function Faq() {
  const accordionItems = [
    {
      title: "Do you store user notifications?",
      content: (
        <div className="text-muted-foreground">
          Only when a user is offline. Delivered notifications are automatically
          deleted weekly.
        </div>
      ),
    },
    {
      title: "How long are test keys valid?",
      content: (
        <div className="text-muted-foreground">
          Test keys are valid for <strong>4 hours</strong>. They are generated
          once per request.
        </div>
      ),
    },
    {
      title: "Can I regenerate a test key?",
      content: (
        <div className="text-muted-foreground">
          No. Test keys cannot be regenerated. You may contact support to
          request a reset.
        </div>
      ),
    },
    {
      title: "Why must user_id be a UUID?",
      content: (
        <div className="text-muted-foreground">
          UUIDs ensure globally unique user identifiers and prevent collisions
          across unrelated applications.
        </div>
      ),
    },
    {
      title: "Where do I send notifications?",
      content: (
        <div className="text-muted-foreground">
          Send POST requests to:{" "}
          <code className="text-primary">
            https://notifications.arifa.dev/bff_v001/notify
          </code>
        </div>
      ),
    },
    {
      title: "How do I connect to the WebSocket?",
      content: (
        <div className="text-muted-foreground">
          Connect using:{" "}
          <code className="text-primary">
            wss://notifications.arifa.dev?apikey=KEY&user_id=UUID&client=web or
            mobile
          </code>
        </div>
      ),
    },
    {
      title: "Do you support mobile apps?",
      content: (
        <div className="text-muted-foreground">
          Yes. We support Android, iOS, and React Native via WebSocket.
        </div>
      ),
    },
  ];

  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0 }}
      className="relative w-full max-w-(--breakpoint-xl) mx-auto px-4 py-28 gap-5 md:px-8 flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="text-2xl font-bold sm:text-3xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
          FAQ
        </h4>
        <p className="max-w-xl text-muted-foreground text-center">
          Here are some of our frequently asked questions.
        </p>
      </div>
      <div className="flex w-full max-w-lg">
        <Accordion type="multiple" className="w-full">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="text-muted-foreground"
            >
              <AccordionTrigger className="text-left">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
}
