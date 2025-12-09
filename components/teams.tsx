"use client";
import { motion } from "framer-motion";

export default function Teams() {
  const team = [
    {
      name: "Peter Nyando",
      role: "Founder & Developer",
      avatar: "/team/peter.jpeg",
      bio: "Designs and builds the core architecture and realtime systems that power Arifa, ensuring reliability and scalability.",
    },
    {
      name: "George Maina",
      role: "Security & DevOps",
      avatar: "/team/goerg.jpeg",
      bio: "Manages security, infrastructure, and deployment pipelines, making sure Arifa stays secure, fast, and stable.",
    },
  ];

  return (
    <section id="team" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 flex flex-col gap-3"
        >
          <h2 className="text-xl font-semibold sm:text-2xl bg-linear-to-b from-foreground to-muted-foreground text-transparent bg-clip-text">
            Meet the Arifa Team
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground text-center">
            The people building Africa’s realtime infrastructure.
          </p>
        </motion.div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <div className="p-6 rounded-xl bg-card border border-border transition-colors duration-300 flex flex-col items-center text-center">
                {/* Avatar */}
                <img
                  src={member.avatar}
                  className="w-60 h-60 rounded-full object-cover border border-primary/20 mb-4"
                  alt={member.name}
                />
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.role}
                </p>

                {/* Bio */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
