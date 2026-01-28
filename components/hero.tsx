"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative justify-center items-center">
      <section className="max-w-[--breakpoint-xl] mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="flex flex-col justify-center items-center space-y-6 max-w-4xl mx-auto text-center"
        >
          <span className="w-fit text-xs font-medium bg-card px-3 py-1 border border-border rounded-full tracking-wide">
            v1.0.0
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight bg-linear-to-b from-sky-800 dark:from-sky-100 to-foreground bg-clip-text text-transparent">
            Send realtime events to users
            <br className="hidden sm:block" />
            without a realtime backend
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Arifa is a simple HTTP → WebSocket event pipe.
            <br />
            Send one request and the right user receives it instantly.
            <br />
            No databases. No channels. No socket servers.
          </p>

          <p className="text-sm text-muted-foreground tracking-wide">
            Not a database. Not a push notification service. Just realtime events.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-x-3"
          >
            <Button
              onClick={() => router.push("https://documentation.arifa.dev/")}
              className="shadow-lg"
            >
              Read the Docs
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center pointer-events-none"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl max-sm:rotate-12 sm:rotate-30 will-change-transform" />
        </div>
      </motion.div>
    </div>
  );
}
